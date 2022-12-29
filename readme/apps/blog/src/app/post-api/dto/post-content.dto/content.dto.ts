import { VideoDTO } from "./video.dto";
import { TextDTO } from "./text.dto";
import { PhotoDTO } from "./photo.dto";
import { LinkDTO } from "./link.dto";
import { CiteDTO } from "./cite.dto";

export type ContentDTO = VideoDTO | TextDTO | PhotoDTO | LinkDTO | CiteDTO
