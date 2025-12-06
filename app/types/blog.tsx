export type Blog = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    body: string;
    link:string;
    tag:string;
    header_image: {
      url: string;
      width: number;
      height: number;
    };
    category: [
      {
        id: string;
        name: string[];
      }
    ];
  };