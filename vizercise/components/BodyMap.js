import * as d3 from "d3";
import Script from "next/script";
import { useEffect, useState } from "react";
import musclesConst from "@/public/musclesConst";

export default function BodyMap({ css, onClick }) {
  const backBody = "/back_body_highlighted.svg";
  const frontEmpty = "/front_empty.svg";
  const frontString = "Show back";
  const backString = "Show front";
  const mirror = "translate(330, 0) scale(-1, 1)";
  const traps =
    "M 127.8 155 Q 140.3 162 132.2 180.1 Q 126.6 181.4 109.5 178.6 T 88.9 170.3 C 100.9 167.1 117.4 159.2 127.6 155 Z";
  const pecs =
    "M 152.9 208.2 C 159.4 216.9 158.1 252.3 155.6 256.8 Q 145.2 274.4 119.4 263.1 C 100.5 256.8 84.8 251.2 72.8 247.2 C 68.2 245.7 60.3 243.7 59.4 241.7 C 65.6 221.7 71.5 203.2 81.2 196.6 C 91.1 188.8 121.7 189.4 128.1 190.2 C 140.5 193.4 147.7 199 153 208.3";
  const shoulder_front =
    "M 93 186 C 76 186 61 206 56 220 Q 50 234 47 246 C 40 248 36 222 40 207 C 47 184 67 175 81 176 C 86 179 94 183 93 186 Z";
  const bicep =
    "M 73 293 Q 66 333 49 331 Q 36 325 41 289 Q 49 251 64 251 Q 77 255 73 293";
  const forearm_outer =
    "M 49 411.3 Q 53.8 435.7 50.1 437.1 Q 46.1 438 40.3 411.6 Q 35.6 387.4 39.2 386.6 Q 43.3 385.6 48.9 411.3";
  const forearm_inner =
    "M 69.8 353.6 Q 71.6 358.4 69.1 360.4 Q 65.4 361.4 63.3 356.1 Q 61.2 350 64.1 349.1 Q 67.5 349.5 69.8 353.6";
  const forearm_mid =
    "M 66.6 369.2 C 70.8 390.6 63 433.6 55.9 435.9 C 56.7 408.9 49.1 393.6 41.3 377.9 C 36.5 361.6 44.5 342.3 46.3 343 C 56.3 346.8 66.4 366.2 66.6 369.2";
  const obliques =
    "M 83.6 266.2 C 91.9 268.6 99.7 271.9 107.3 275.2 C 111.8 277.6 116.2 281 117.2 285.8 C 119 296.3 115.5 299.8 92.3 292.9 C 104.6 296.6 119.1 300.2 120.8 311.2 C 121.4 319.7 120.4 326.6 98.7 318.1 C 114.1 323.8 122.4 324.2 121.4 336.3 C 120.7 344.6 120.6 348.7 101.6 340 C 114.1 345.7 121.9 345.6 121.8 355 C 121.6 360.3 119.5 364.1 102.7 358 C 117.3 363 125.9 362.8 126.8 379.9 C 128 402.2 119.4 404.8 102.3 392.2 C 106.2 308.5 87.7 286.7 83.6 266.2 Z";
  const abs_1 =
    "M 151.1 292.2 C 145.1 296.6 130.2 303.7 127.2 301.1 C 122.3 295.9 131.1 280.6 135.1 277.6 C 142.5 270.7 155.8 267.2 157.5 269.7 C 159.9 273 158.9 287.1 151.2 292.1 Z";
  const abs_2 =
    "M 150.3 326 C 150.6 326 126.8 330.8 124.9 323.9 C 123.1 316 130.8 311.4 135.4 308.7 C 143.8 303.6 151.3 299.2 153 297.4 C 159 303 159.3 319.1 154 323.3 Q 152.6 324.7 150.4 326 Z";
  const abs_3 =
    "M 149.8 353.5 C 144.5 354.3 129.4 356.6 128.9 355.7 C 126.6 346.4 130.6 341.2 135.7 338.6 C 143 335.8 155.8 330.7 157.4 331.6 C 158.8 332.5 163 336.9 158.8 347.5 C 157 351 154 352.7 149.9 353.5 Z";
  const abs_4 =
    "M 136.9 396.6 C 134.9 392.3 128 370.8 128.9 367.2 C 130 361.4 136.2 359.2 140.8 359.3 C 152.6 360.5 158.5 355.7 162.3 357.1 C 163.2 357.4 160.4 380.3 161.6 424.7 C 160.3 427.3 147.1 418.6 144.3 413.1 C 142.6 410 139.8 404.8 136.8 396.6";
  const quad_mid =
    "M 117.4 415.1 C 120.2 416.3 132.6 447.6 133.5 456.5 C 134.2 459.9 133.1 477.8 128.7 492.9 C 127 498.6 125.7 510.3 124.8 521 C 123.6 535.2 121.2 557.3 119.2 571.4 C 118.7 573 115.2 578 112.3 571.9 C 105.7 553.3 103.6 533.8 101.2 518.7 C 97.9 501.8 98.7 482.8 99.2 471.5 C 100.4 454.4 102.8 441.6 106.4 432.8 C 110 421.7 116.6 414.6 117.4 415 Z";
  const quad_outer =
    "M 95.1 465.2 C 96.1 476.9 95.5 489.1 95.8 501.1 C 95.9 515.1 98.2 528.6 99.2 539.8 C 100.5 551.9 104.7 563.1 103.6 570.8 C 103 575 100.1 575.8 96.1 570.3 C 92.2 564.7 86.5 552.7 85.7 548.3 C 83.6 535.8 84 519.2 84.8 507 C 86.4 492.2 92.3 477.2 94.6 465.4 C 94.7 465.1 94.9 464.2 95.1 465.1 Z";
  const quad_inner =
    "M 138.5 466.7 C 143.4 470.1 146.5 482.6 146.9 496.6 C 147 500.6 147.5 517.1 144.3 530.9 C 141.1 546.2 138.9 552.2 137.3 556.8 C 135.5 560.9 132.5 571 130.1 570.5 C 127.2 569.5 126.1 562.6 126.6 554.7 C 127.8 535.2 130 516.5 132.7 504.6 C 135.7 491.8 138.5 477.4 138.2 472.1 C 138.1 469.7 137.8 466.5 138.4 466.6";

  const maleFront = musclesConst[0];


  const [body, setBody] = useState(frontEmpty);
  const [buttonString, setString] = useState(frontString);

  function drawBody() {
    console.log(maleFront);
    return body === frontEmpty ? drawFront() : drawBack();
  }

  function drawFront() {
    return (
      <svg className={css} viewBox="0 0 330 860">
        <image href={frontEmpty} width="330" height="860" />
        <g
          className="traps"
          id="Traps"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.traps")}
          onMouseLeave={() => unfillMuscle("g.traps")}
          onClick={() => handleMuscleClick("Traps")}
        >
          <path d={traps} />
          <path d={traps} transform={mirror} />
        </g>
        <g
          className="pecs"
          id="Chest"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.pecs")}
          onMouseLeave={() => unfillMuscle("g.pecs")}
          onClick={() => handleMuscleClick("Chest")}
        >
          <path d={pecs} />
          <path d={pecs} transform={mirror} />
        </g>
        <g
          className="shoulder_front"
          id="Shoulders"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.shoulder_front")}
          onMouseLeave={() => unfillMuscle("g.shoulder_front")}
          onClick={() => handleMuscleClick("Shoulders")}
        >
          <path d={shoulder_front} />
          <path d={shoulder_front} transform={mirror} />
        </g>
        <g
          className="bicep"
          id="Biceps"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.bicep")}
          onMouseLeave={() => unfillMuscle("g.bicep")}
          onClick={() => handleMuscleClick("Biceps")}
        >
          <path d={bicep} />
          <path d={bicep} transform={mirror} />
        </g>
        <g
          className="forearm"
          id="Forearms"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.forearm")}
          onMouseLeave={() => unfillMuscle("g.forearm")}
          onClick={() => handleMuscleClick("Forearms")}
        >
          <path d={forearm_outer} />
          <path d={forearm_outer} transform={mirror} />
          <path d={forearm_inner} />
          <path d={forearm_inner} transform={mirror} />
          <path d={forearm_mid} />
          <path d={forearm_mid} transform={mirror} />
        </g>
        <g
          className="obliques"
          id="Obliques"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.obliques")}
          onMouseLeave={() => unfillMuscle("g.obliques")}
          onClick={() => handleMuscleClick("Obliques")}
        >
          <path d={obliques} />
          <path d={obliques} transform={mirror} />
        </g>
        <g
          className="abs"
          id="Abdominals"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.abs")}
          onMouseLeave={() => unfillMuscle("g.abs")}
          onClick={() => handleMuscleClick("Abdominals")}
        >
          <path d={abs_1} />
          <path d={abs_1} transform={mirror} />
          <path d={abs_2} />
          <path d={abs_2} transform={mirror} />
          <path d={abs_3} />
          <path d={abs_3} transform={mirror} />
          <path d={abs_4} />
          <path d={abs_4} transform={mirror} />
        </g>
        <g
          className="quads"
          id="Quads"
          stroke="black"
          fill="transparent"
          onMouseEnter={() => fillMuscle("g.quads")}
          onMouseLeave={() => unfillMuscle("g.quads")}
          onClick={() => handleMuscleClick("Quads")}
        >
          <path d={quad_mid} />
          <path d={quad_mid} transform={mirror} />
          <path d={quad_outer} />
          <path d={quad_outer} transform={mirror} />
          <path d={quad_inner} />
          <path d={quad_inner} transform={mirror} />
        </g>
      </svg>
    );
  }

  function drawBack() {
    return (
      <svg width="330" height="860" viewBox="0 0 330 860">
        <image href={backBody} width="330" height="860" />
      </svg>
    );
  }

  function fillMuscle(inputStr) {
    d3.selectAll(inputStr)
      .transition()
      .ease(d3.easeLinear)
      .duration(100)
      .attr("fill", "black")
      .style("cursor", "pointer");
  }

  function unfillMuscle(inputStr) {
    d3.selectAll(inputStr)
      .transition()
      .ease(d3.easeLinear)
      .duration(100)
      .attr("fill", "transparent");
  }

  function handleMuscleClick(inputStr) {
    onClick(inputStr);
  }

  function handleClick() {
    if (body === frontEmpty) {
      setBody(backBody);
      setString(backString);
    } else {
      setBody(frontEmpty);
      setString(frontString);
    }
  }

  useEffect(() => {
    drawBody();
  }, [body]);

  return (
    <div>
      <Script src="https://d3js.org/d3.v7.min.js" />
      {/* <button onClick={handleClick}>{buttonString}</button> */}
      {drawBody()}
    </div>
  );
}
