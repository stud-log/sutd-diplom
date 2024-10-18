import { useEffect, useState } from "react";

import { $api } from "@/shared/http/host";
import { DefaultOptionType } from "@/shared/ui/Select";
import { Group } from "@stud-log/news-types/models";

function useGroups() {
  const [ groups, setGroups ] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await $api.get<Group[]>('/api/groups');
        if (isMounted) {
          const preparedGroups = response.data.map((item) => ({
            id: item.id,
            value: item.name,
            label: item.name,
          }));
          setGroups(preparedGroups);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return groups;
}

export default useGroups;