import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/polytrackmods/PolyModLoader/0.6.3/PolyTypes.js";

const defaultFrames = 600000;
const carStyle = `Zt.A.deserializeSafe("")`;

class ReplayViewerMod extends PolyMod {
  init = (pml) => {
    pml.registerFuncMixin("nl", {
      type: MixinType.INSERT,
      token: "}, 500));",
      func: `
        const list = (0, R.gn)(this, Oo, "f"),
          audio = (0, R.gn)(this, zo, "f"),
          lang = (0, R.gn)(this, Io, "f"),
          load = document.createElement("button"),
          add = (id) => {
            const now = new Date();
            (0, R.gn)(this, Ro, "m", il).call(this, 1, "Replay", null, new xt.A(+id.split(" ")[0]), now, ${carStyle}, _o.Y.Pending, !1, id, now, n);
            const entry = list.lastChild;
            entry.querySelectorAll(".position, .verified-state").forEach((e) => e.remove());
            load.after(entry);
            return entry;
          };
        this.replays ??= [];
        load.className = "button";
        load.style.margin = "10px 10px 0";
        load.innerHTML = '<img class="button-icon" src="images/import.svg"> Load replay';
        load.addEventListener("click", () => {
          audio.playUIClick();
          const mod = ActivePolyModLoader.getMod("replayviewer"),
            box = (mod.box ??= new Nd(audio)),
            input = document.createElement("input"),
            time = document.createElement("input");
          input.type = time.type = "text";
          input.spellcheck = time.spellcheck = !1;
          input.style.cssText = time.style.cssText = "display: block; box-sizing: border-box; width: 100%; clip-path: none";
          time.style.marginTop = "10px";
          input.placeholder = "Paste replay code here...";
          time.inputMode = "numeric";
          time.placeholder = "Time in frames (${defaultFrames})";
          box.showConfirm("", lang.get("Cancel"), lang.get("Ok"), null, () => {
            const code = input.value.trim(),
              frames = Number(time.value.trim() || ${defaultFrames}),
              id = frames + " " + code;
            if (!ie.A.deserialize(code) || !Number.isSafeInteger(frames) || frames <= 0 || frames > ie.A.maxFrames)
              setTimeout(() => box.show("Replay invalid", lang.get("Ok")));
            else if (!this.replays.includes(id)) {
              this.replays.push(id);
              add(id).click();
            }
          });
          (0, R.gn)(box, Md, "f").append(input, time);
          input.focus();
        });
        list.prepend(load);
        this.replays.forEach(add);
      `,
    });
    pml.registerClassMixin("wf.prototype", "getRecordings", {
      type: MixinType.INSERT,
      token: "getRecordings(e) {",
      func: `
        const ids = e.filter((id) => "string" != typeof id);
        if (ids.length < e.length)
          return (ids.length ? this.getRecordings(ids) : Promise.resolve([])).then((recordings) =>
            e.map((id) => ("string" == typeof id ? { recording: ie.A.deserialize(id.split(" ")[1]), time: new xt.A(+id.split(" ")[0]), carStyle: ${carStyle} } : recordings.shift())),
          );
      `,
    });
  };
}

export const polyMod = new ReplayViewerMod();
