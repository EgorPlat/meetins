export interface IShortEventInfo {
    id: number,
    title: string,
    description: string,
    price: number,
    images: any[],
    age_restriction: number
}
export interface IEventInfoCard {
    id: number,
    publication_date: number,
    dates: [
      {
        start: string,
        end: string
      }
    ],
    title: string,
    slug: number,
    place: {
      id: number
    },
    description: string,
    body_text: string,
    location: {
      slug: string
    },
    categories: string[],
    tagline: string,
    age_restriction: string,
    price: string,
    is_free: boolean,
    images: [
      {
        image: string,
        source: {
          link: string,
          name: string
        }
      }
    ],
    favorites_count: number,
    comments_count: number,
    site_url: string,
    short_title: string,
    tags: string[],
    disable_comment: boolean,
    participants: [
      {
        role: {
          slu: string
        },
        agent: {
          id: 6954,
          title: string,
          slug: string,
          agent_type: string,
          images: string[],
          site_url: string
        }
      }
    ]
}