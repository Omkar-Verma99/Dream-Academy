export const portalCampsQuery = `*[_type == "camp"] | order(dateStart desc) {
  _id,
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ url }, alt },
  video
}`;

export const portalCampByIdQuery = `*[_type == "camp" && _id == $id][0] {
  _id,
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ url }, alt },
  photos[] { asset->{ _id, url }, alt, caption },
  galleryVideos[] { asset->{ _id, url }, caption },
  report,
  video
}`;

export const portalEventsQuery = `*[_type == "event"] | order(startDateTime desc) {
  _id,
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  venue,
  virtual,
  description,
  registrationUrl,
  featured
}`;

export const portalEventByIdQuery = `*[_type == "event" && _id == $id][0] {
  _id,
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  venue,
  virtual,
  description,
  registrationUrl,
  featured
}`;

export const portalResearchQuery = `*[_type == "researchProject"] | order(startDate desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  status,
  startDate,
  principalInvestigator
}`;

export const portalResearchByIdQuery = `*[_type == "researchProject" && _id == $id][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  status,
  startDate,
  principalInvestigator,
  body
}`;
