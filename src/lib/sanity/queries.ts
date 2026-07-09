export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  contactAddress,
  contactEmail,
  contactPhones,
  socialLinks,
  registrationNumbers,
  impactStats[] | order(order asc) { label, value, order }
}`;

export const focusAreasQuery = `*[_type == "focusArea"] | order(order asc) {
  title,
  "slug": slug.current,
  romanNumeral,
  shortDescription,
  ctaLabel
}`;

export const recentCampsQuery = `*[_type == "camp"] | order(dateStart desc)[0...4] {
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ url }, alt },
  "caption": coalesce(heroImage.alt, title)
}`;

export const fieldGalleryCampsQuery = `*[_type == "camp"] | order(dateStart desc) {
  title,
  "slug": slug.current,
  location,
  dateStart,
  heroImage { asset->{ url }, alt },
  photos[] { asset->{ url }, alt, caption }
}`;

export const featuredResearchQuery = `*[_type == "researchProject" && status == "ongoing"] | order(startDate desc)[0...2] {
  title,
  "slug": slug.current,
  description,
  "date": startDate
}`;

export const recentPublicationsQuery = `*[_type == "publication"] | order(year desc)[0...7] {
  title,
  "slug": slug.current,
  authors,
  journal,
  year
}`;

export const campSlugsQuery = `*[_type == "camp"]{ "slug": slug.current }`;

export const campFilterOptionsQuery = `{
  "years": array::unique(*[_type == "camp"].dateStart[0..4]) | order(@ desc),
  "districts": array::unique(*[_type == "camp"].location.district) | order(@ asc),
  "total": count(*[_type == "camp"])
}`;

export const campSummariesQuery = `*[_type == "camp"
  && ($district == "" || location.district == $district)
  && ($yearStart == "" || (dateStart >= $yearStart && dateStart <= $yearEnd))
  && ($q == "" || title match $q || location.name match $q || location.district match $q)
] | order(dateStart desc) [$start...$end] {
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ _id, url }, alt },
  "caption": coalesce(heroImage.alt, title),
  "photoCount": count(photos),
  photos[] { asset->{ _id, url }, alt }
}`;

export const campSummariesCountQuery = `count(*[_type == "camp"
  && ($district == "" || location.district == $district)
  && ($yearStart == "" || (dateStart >= $yearStart && dateStart <= $yearEnd))
  && ($q == "" || title match $q || location.name match $q || location.district match $q)
])`;

export const recentCampSummariesQuery = `*[_type == "camp"] | order(dateStart desc)[0...$limit] {
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ _id, url }, alt },
  "caption": coalesce(heroImage.alt, title),
  "photoCount": count(photos),
  photos[] { asset->{ _id, url }, alt }
}`;

export const allCampsQuery = `*[_type == "camp"] | order(dateStart desc) {
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ url }, alt },
  photos[] { asset->{ url }, alt, caption },
  galleryVideos[] { asset->{ url }, caption },
  report,
  statistics,
  video
}`;

export const campBySlugQuery = `*[_type == "camp" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  location,
  dateStart,
  dateEnd,
  heroImage { asset->{ url }, alt },
  photos[] { asset->{ url }, alt, caption },
  galleryVideos[] { asset->{ url }, caption },
  report,
  statistics,
  video
}`;

export const allEventsQuery = `*[_type == "event"] | order(startDateTime asc) {
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  description,
  registrationUrl
}`;

export const upcomingEventsQuery = `*[_type == "event" && startDateTime >= now()] | order(startDateTime asc)[0...$limit] {
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  venue,
  virtual,
  registrationUrl,
  description
}`;

export const pastEventsQuery = `*[_type == "event" && startDateTime < now()] | order(startDateTime desc)[0...$limit] {
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  venue,
  virtual,
  registrationUrl,
  description
}`;

export const upcomingEventsQueryLegacy = `*[_type == "event" && startDateTime > now()] | order(startDateTime asc) {
  title,
  "slug": slug.current,
  type,
  startDateTime,
  endDateTime,
  venue,
  virtual,
  registrationUrl,
  description
}`;

export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  body
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  body
}`;

export const allResearchProjectsQuery = `*[_type == "researchProject"] | order(startDate desc) {
  title,
  "slug": slug.current,
  description,
  status,
  startDate,
  principalInvestigator,
  body
}`;

export const allPublicationDetailsQuery = `*[_type == "publication"] | order(year desc) {
  title,
  "slug": slug.current,
  authors,
  journal,
  year,
  doi,
  abstract
}`;

export const founderQuery = `*[_type == "trustee" && category == "founder"][0]{
  name,
  role,
  credentials,
  photo,
  bio
}`;

export const trusteesQuery = `*[_type == "trustee"] | order(order asc) {
  name,
  role,
  credentials,
  photo,
  category,
  bio
}`;
