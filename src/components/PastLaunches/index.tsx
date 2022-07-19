import { FC, useEffect, useState } from "react";
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import { QUERY_PAST_LAUNCHES } from "../../gql";
import { Button, Card, List, message, Modal, Typography  } from 'antd';
import { parseTime } from "../../utils";
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import Launche from "../Launche";

import './index.scss';

const { Meta } = Card;
const { Title } = Typography;

const listGridProp = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 6
}

const PastLaunches: FC = () => {

  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)
  const [list, setList] = useState<Array<ILaunche>>([])
  const [modalData, setModalData] = useState<{ visible: boolean, data: any}>({ visible: false, data: {} })
  
  const [getLAUNCHES, { loading }] = useLazyQuery<{ launchesPast: Array<ILaunche> }>(QUERY_PAST_LAUNCHES, {
    variables: { 
      offset,
      limit
     },
  })

  useEffect(() => {
    getData();
  }, [])

  const getData = (offset: number = 0, limit: number = 10) => {
    getLAUNCHES({
      variables: { 
        offset,
        limit
      },
    }).then((LAUNCHES) => {
      const { data, variables, networkStatus } = LAUNCHES
      if(networkStatus === NetworkStatus.error) {
        message.error('network error, please wait!');
        return;
      }

      if(data?.launchesPast.length) {
        setList(data.launchesPast);

        if(variables) {
          setOffset(variables.offset);
        }
      } else {
        message.warn("It's the last page!");
      }
    })
  }

  const handleDetialClick = (data: ILaunche) => {
    setModalData({
      visible: true,
      data
    });
  }

  const handleModalCancel = () => {
    setModalData({ visible: false, data: {} });
  }

  const handlePaginationChange = (direction: 'prev' | 'next') => {
    if(direction === 'prev' && offset === 0) {
      message.warn("It's already page one!");
      return;
    }

    const _offset = Math.max(0, direction === 'prev' ? offset - limit : offset + limit);
    getData(_offset);
  }

  return (
    <div className="container">
      <Title level={2}>Past Launches</Title>
      <div className="list">
        <List
          loading={loading}
          style={{ minHeight: 250 }}
          grid={listGridProp}
          dataSource={list}
          renderItem={item => (
            <List.Item onClick={() => handleDetialClick(item)}>
              <Card hoverable>
                <Meta
                  title={item.mission_name}
                  description={parseTime(item.launch_date_local)}
                />
              </Card>
            </List.Item>
          )}
        />
        <div className="pagination">
          <Button size="large" icon={<LeftOutlined />} style={{ marginRight: 20 }} onClick={() => handlePaginationChange('prev')}/>
          <Button size="large" icon={<RightOutlined />} onClick={() => handlePaginationChange('next')} />
        </div>
      </div>

      <Modal
        width="1200px"
        visible={modalData.visible}
        title={modalData.data.mission_name}
        onCancel={() => handleModalCancel()}
        footer={[
          <Button key="back" onClick={() => handleModalCancel()}>
            Cancel
          </Button>
        ]}
        destroyOnClose
      >
        <Launche loading={false} data={modalData.data} />
      </Modal>
    </div>
  );
}

export default PastLaunches;