import { FC } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LAUNCHES_NEXT } from "../../gql";
import Launche from "../Launche";
import { Typography } from "antd";

const { Title } = Typography;


const LaunchNext: FC = () => {
  const { loading, data } = useQuery<{ launchNext: ILaunche }>(QUERY_LAUNCHES_NEXT);

  return (
    <div>
        <Title level={2}>Launch Next</Title>
        <Launche loading={loading} data={data?.launchNext} />
    </div>
  );
}

export default LaunchNext;