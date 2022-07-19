/// <reference types="react-scripts" />


interface ILaunche {
  id: string
  mission_name: string
  launch_date_local: string
  launch_success: boolean | null
  launch_site: {
    site_name_long: string
  }
  links: {
    article_link: string | null
    video_link: string | null
  }
  rocket: {
    rocket_name: string
    rocket_type: string
  },
  details: string | null
}