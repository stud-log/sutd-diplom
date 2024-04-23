import { FCEvent } from "../types";

export function TooltipTemplate(eventDesc: FCEvent) {
  return (
    `<div class="event-desc" >
            <div class="event-desc__date">
                
                <div class="time">
                ${eventDesc.start !== '00:00' ?
      `<span>${eventDesc.start} - ${eventDesc.end}</span>`: ""
    }
                </div>
            </div>
        <div class="event-desc__typeAndRoom">${eventDesc.info.type ? `${eventDesc.info.type}, ` : ''}${eventDesc.info.room}</div>
        <div class="event-desc__title">${eventDesc.info.fullTitle}</div>
            <div class="info">
                ${eventDesc.info.type ?
      `<div class="li">
                    <span class="marker marker_yellow">•</span>
                     ${eventDesc.info.room == 'ДО' ? 'Дистанционно' : `Очно, ${eventDesc.info.room}`}
                </div>` : ''
    }
                
                
                ${eventDesc.info.teacher ?
      `<div class="li">
                    <span class="marker marker_yellow">•</span>
                    ${eventDesc.info.teacher}
                </div>` : ''
    }
            </div>
            ${eventDesc.info.room == 'ДО' && eventDesc.info.link ? `<a class="event-desc__button event-desc__button_do" target="_blank" href="${eventDesc.info.link}">Зайти на пару</a>` : ''}
            <a class="event-desc__button" target="_blank" href="/schedule/${eventDesc.info.recordId}">Открыть отдельно</a>

    </div>`
  );
}