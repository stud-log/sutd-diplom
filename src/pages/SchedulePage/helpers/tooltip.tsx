import { FCEvent } from "../types";

export function TooltipTemplate(eventDesc: FCEvent) {
  return (
    `<div class="event-desc" >
            <div class="event-desc__date">
                <div class="date">${eventDesc.date}</div>
                <div class="time">
                
                ${eventDesc.start !== '00:00' ?
      `<span>${eventDesc.start} - ${eventDesc.end}</span>`: ""
    }
                </div>
            </div>
        <div class="event-desc__title">${eventDesc.info.room ? `[${eventDesc.info.room}]` : ''} ${eventDesc.title}</div>
            <div class="info">
                ${eventDesc.info.room &&
                `<div class="li">
                    <span class="marker marker_yellow">•</span>
                     ${eventDesc.info.room}
                </div>`
    }
                ${eventDesc.info.type &&
                `<div class="li">
                    <span class="marker marker_green">•</span>
                    ${eventDesc.info.type}
                </div>`
    }
                
                ${eventDesc.info.teacher &&
                `<div class="li">
                    <span class="marker marker_blue">•</span>
                    ${eventDesc.info.teacher}
                </div>`
    }
            </div>
    </div>`
  );
}