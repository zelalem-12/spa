import { useQuery } from 'react-query';
import { useClient } from 'context/AuthContext';
import { config } from 'config';

const loadingAnalysis = {
  name: 'Loading...',
  dob: 'loading...',
};

const getAnalyseNameConfig = (client, data) => ({
  queryKey: ['analyseName', data],
  queryFn: () => {
    if (data.name) {
      return client(config.analyseName.apiUrl, {
        query: data,
      }).then(data => data);
    }

    return {};
  },
});

function useAnalyseName(query) {
  const client = useClient();
  const result = useQuery(getAnalyseNameConfig(client, query));
  return { ...result, data: result.data ?? loadingAnalysis };
}

export { useAnalyseName };
