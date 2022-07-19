import { FC } from "react";
import { Button, Badge, Descriptions, Spin } from 'antd';
import { formatYoutubeUrl, parseTime } from "../../utils";

interface LauncheProps {
  loading: boolean
  data?: ILaunche
}

const Launche: FC<LauncheProps> = props => {
  const { loading, data } = props;

  const handleOpenLink = (link: string) => {
    window.open(link, '_blank');
  }
  
  return (
    <div
        style={{
          width: '100%',
          maxHeight: '700px',
          overflowY: 'auto'
        }}
      >
        { loading && <Spin style={{ width: '100%', textAlign: 'center' }} /> }

        {
          data?.links.video_link && <div
            style={{
              width: '100%',
              marginBottom: 20,
              textAlign: 'center'
            }}
          >
            <iframe
              style={{
                width: "100%",
                // maxWidth: "800px",
                height: "600px"
              }}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              src={formatYoutubeUrl(data.links?.video_link)}
              allowFullScreen
            />
          </div>
        }
        
        {
          data && <Descriptions
            bordered
            column={2}
          >
            <Descriptions.Item label="Mission Name" span={2}>
              {data.mission_name}
            </Descriptions.Item>
            <Descriptions.Item label="Launch Success" span={2}>
              <Badge
                status={data.launch_success ? 'success' : 'error'}
                text={data.launch_success ? 'Successed' : 'Failed'}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Launch Date">
              {parseTime(data.launch_date_local)}
            </Descriptions.Item>
            <Descriptions.Item label="Launch Site" span={2}>
              {data.launch_site.site_name_long}
            </Descriptions.Item>
            <Descriptions.Item label="Rocket Name">
              {data.rocket.rocket_name}
            </Descriptions.Item>
            <Descriptions.Item label="Rocket Type">
              {data.rocket.rocket_type}
            </Descriptions.Item>
            <Descriptions.Item label="Article" span={2}>
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={() => handleOpenLink(data.links.article_link || '')}
              >
                {data.links.article_link || '-'}
              </Button>
            </Descriptions.Item>
            <Descriptions.Item label="Details" span={2}>
              {data.details || '-'}
            </Descriptions.Item>
          </Descriptions>
        }
    </div>
  )
}

export default Launche;