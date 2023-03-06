import * as t from "io-ts";

import { BioType, BooleanType, ImageUrlType, SlugType } from "../../types";

export const ProfileType = t.strict(
  {
    username: SlugType,
    bio: BioType,
    image: ImageUrlType,
    following: BooleanType,
  },
  "ProfileType"
);

export type ProfileType = t.TypeOf<typeof ProfileType>;
