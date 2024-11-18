import { appConfig } from "@/lib/config";

// interface PaginationProps {
//     page: number;
//     perPage: number
// }

const {  spaceId,accessToken } = appConfig;

const getEntriesagination = async ()  => {
    const fetchUrl = await fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}/explore?access_token=_${accessToken}`)
  return ;
};

export default getEntriesagination;
