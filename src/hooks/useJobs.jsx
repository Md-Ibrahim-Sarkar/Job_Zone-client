import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useJobs() {
  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const data = await axios.get(`https://job-zone.vercel.app/jobs`)
      return data
    },
  })

  return jobs
}

export default useJobs