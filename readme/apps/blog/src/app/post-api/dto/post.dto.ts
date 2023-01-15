import CreateVideoDTO from "./create-video.dto";
import CreateTextDTO from "./create-text.dto";
import CreateCiteDTO from "./create-cite.dto";
import CreatePhotoDTO from "./create-photo.dto";
import CreateLinkDTO from "./create-link.dto";

export type PostDTO = CreateVideoDTO | CreateTextDTO | CreateCiteDTO | CreatePhotoDTO | CreateLinkDTO;
