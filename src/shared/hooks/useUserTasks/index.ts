import { UserTask } from "@stud-log/news-types/models";
import { useEffect, useState } from "react";

import { $api } from "@/shared/http/host";
import { DefaultOptionType } from "@/shared/ui/Select";

function useUserTasks() {
  const [ tasks, setTasks ] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await $api.get<UserTask[]>(`/api/users/myTasks`);
        if (isMounted) {
          const preparedSubjects = response.data.map((item) => {
            const homeworkTask = item.record?.homework ? item : null;
            const customTask = item.title ? item : null;
            if(homeworkTask) {
              return ({
                id: item.id,
                value: item.id,
                label: homeworkTask.record?.homework?.title,
              });
            }
            else if (customTask) {
              return ({
                id: item.id,
                value: item.id,
                label: customTask.record?.userTask?.title,
              });
            }

            return undefined;
          });
          setTasks(preparedSubjects.filter(Boolean) as DefaultOptionType[]);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return tasks;
}

export default useUserTasks;