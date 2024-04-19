import { useEffect, useState } from "react";

import { $api } from "shared/http/host";
import { DefaultOptionType } from "shared/ui/Select";
import { Subject } from "@stud-log/news-types/models";
import userService from "services/user.service";

function useGroupSubjects() {
  const group = userService.getGroup();
  const [ subjects, setSubjects ] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await $api.get<Subject[]>(`/api/subjects/byGroup?groupId=${group.id}`);
        if (isMounted) {
          const preparedSubjects = response.data.map((item) => ({
            id: item.id,
            value: item.id,
            label: item.title,
            teacherName: item.teacherName,
          }));
          setSubjects(preparedSubjects);
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

  return subjects;
}

export default useGroupSubjects;