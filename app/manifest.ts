import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name:"Ajanee Igharo | Applied AI Engineer", short_name:"Ajanee Igharo", description:"Applied AI engineering for real organizational workflows.", start_url:"/", display:"standalone", background_color:"#f6f2e9", theme_color:"#174b39", icons:[{ src:"/favicon.png", sizes:"96x96", type:"image/png" }] };
}
