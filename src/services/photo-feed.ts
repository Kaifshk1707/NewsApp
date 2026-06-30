export type PhotoItem = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export function getPhotoImageUri(photo: PhotoItem, variant: "hero" | "thumb") {
  const remoteUrl = variant === "hero" ? photo.url : photo.thumbnailUrl;

  if (remoteUrl.includes("via.placeholder.com")) {
    return variant === "hero"
      ? `https://picsum.photos/seed/jsonphoto-${photo.id}/960/640`
      : `https://picsum.photos/seed/jsonphoto-${photo.id}/360/360`;
  }

  return remoteUrl;
}

export function getPostAuthor(photoId: number) {
  const authors = [
    "Aanya Corbett",
    "Liam Li",
    "Ira Sen",
    "Noah Reed",
    "Aditi Roy",
    "Mason Blake",
    "Sara Khan",
    "Arjun Bose",
  ];

  return authors[photoId % authors.length]!;
}

export function getPostHandle(photoId: number) {
  return `@newsroom${String(photoId).padStart(3, "0")}`;
}

export function getPostTime(photoId: number) {
  const minutes = ((photoId * 7) % 59) + 1;
  return `${minutes}m ago`;
}

export function getPostCategory(photoId: number) {
  const categories = ["Top Story", "World", "Politics", "Science", "Climate", "Culture"];
  return categories[photoId % categories.length]!;
}

export function getPostLocation(photoId: number) {
  const locations = [
    "Delhi bureau",
    "Kolkata desk",
    "Mumbai live",
    "London wire",
    "Singapore desk",
    "New York desk",
  ];

  return locations[photoId % locations.length]!;
}

export function getPostStats(photoId: number) {
  return {
    comments: 24 + (photoId % 83),
    likes: 120 + ((photoId * 11) % 910),
    views: `${1.2 + ((photoId * 13) % 38) / 10}k`,
  };
}

export function getPostExcerpt(title: string, photoId: number) {
  return `${title.charAt(0).toUpperCase()}${title.slice(1)}. Field teams say the latest visuals, verified updates, and citizen responses are shaping today's conversation across multiple regions.`;
}

export function getPostBody(photo: PhotoItem) {
  const title = `${photo.title.charAt(0).toUpperCase()}${photo.title.slice(1)}`;

  return [
    `${title} is now driving wider discussion across editorial desks after the latest image sequence surfaced through the feed.`,
    `Reporters tracking album ${photo.albumId} say the situation continues to evolve, with local observers pointing to stronger public reaction and faster distribution across social platforms.`,
    `Editors expect post ${photo.id} to remain active in recommendation modules as readers continue opening the full story and sharing clips from the visual report.`,
  ];
}
