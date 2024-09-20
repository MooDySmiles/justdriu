import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import "@fontsource/merriweather/300.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { defineCustomElements as dceMdsAvatar } from "@maggioli-design-system/mds-avatar/loader";
import { defineCustomElements as dceMdsCardContent } from "@maggioli-design-system/mds-card-content/loader";
import { defineCustomElements as dceMdsCardFooter } from "@maggioli-design-system/mds-card-footer/loader";
import { defineCustomElements as dceMdsCardHeader } from "@maggioli-design-system/mds-card-header/loader";
import { defineCustomElements as dceMdsCard } from "@maggioli-design-system/mds-card/loader";
import { defineCustomElements as dceMdsIcon } from "@maggioli-design-system/mds-icon/loader";
import { defineCustomElements as dceMdsImg } from "@maggioli-design-system/mds-img/loader";
import { defineCustomElements as dceMdsText } from "@maggioli-design-system/mds-text/loader";

dceMdsAvatar();
dceMdsCard();
dceMdsCardContent();
dceMdsCardFooter();
dceMdsCardHeader();
dceMdsIcon();
dceMdsImg();
dceMdsText();
