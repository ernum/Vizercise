const musclesConst = [
  {
    id: "male_front",
    traps:
      "M 127.8 155 Q 140.3 162 132.2 180.1 Q 126.6 181.4 109.5 178.6 T 88.9 170.3 C 100.9 167.1 117.4 159.2 127.6 155 Z",
    pecs: "M 152.9 208.2 C 159.4 216.9 158.1 252.3 155.6 256.8 Q 145.2 274.4 119.4 263.1 C 100.5 256.8 84.8 251.2 72.8 247.2 C 68.2 245.7 60.3 243.7 59.4 241.7 C 65.6 221.7 71.5 203.2 81.2 196.6 C 91.1 188.8 121.7 189.4 128.1 190.2 C 140.5 193.4 147.7 199 153 208.3",
    shoulder:
      "M 93 186 C 76 186 61 206 56 220 Q 50 234 47 246 C 40 248 36 222 40 207 C 47 184 67 175 81 176 C 86 179 94 183 93 186 Z",
    bicep:
      "M 73 293 Q 66 333 49 331 Q 36 325 41 289 Q 49 251 64 251 Q 77 255 73 293",
    forearm_outer:
      "M 49 411.3 Q 53.8 435.7 50.1 437.1 Q 46.1 438 40.3 411.6 Q 35.6 387.4 39.2 386.6 Q 43.3 385.6 48.9 411.3",
    forearm_inner:
      "M 69.8 353.6 Q 71.6 358.4 69.1 360.4 Q 65.4 361.4 63.3 356.1 Q 61.2 350 64.1 349.1 Q 67.5 349.5 69.8 353.6",
    forearm_mid:
      "M 66.6 369.2 C 70.8 390.6 63 433.6 55.9 435.9 C 56.7 408.9 49.1 393.6 41.3 377.9 C 36.5 361.6 44.5 342.3 46.3 343 C 56.3 346.8 66.4 366.2 66.6 369.2",
    obliques:
      "M 83.6 266.2 C 91.9 268.6 99.7 271.9 107.3 275.2 C 111.8 277.6 116.2 281 117.2 285.8 C 119 296.3 115.5 299.8 92.3 292.9 C 104.6 296.6 119.1 300.2 120.8 311.2 C 121.4 319.7 120.4 326.6 98.7 318.1 C 114.1 323.8 122.4 324.2 121.4 336.3 C 120.7 344.6 120.6 348.7 101.6 340 C 114.1 345.7 121.9 345.6 121.8 355 C 121.6 360.3 119.5 364.1 102.7 358 C 117.3 363 125.9 362.8 126.8 379.9 C 128 402.2 119.4 404.8 102.3 392.2 C 106.2 308.5 87.7 286.7 83.6 266.2 Z",
    abs_1:
      "M 151.1 292.2 C 145.1 296.6 130.2 303.7 127.2 301.1 C 122.3 295.9 131.1 280.6 135.1 277.6 C 142.5 270.7 155.8 267.2 157.5 269.7 C 159.9 273 158.9 287.1 151.2 292.1 Z",
    abs_2:
      "M 150.3 326 C 150.6 326 126.8 330.8 124.9 323.9 C 123.1 316 130.8 311.4 135.4 308.7 C 143.8 303.6 151.3 299.2 153 297.4 C 159 303 159.3 319.1 154 323.3 Q 152.6 324.7 150.4 326 Z",
    abs_3:
      "M 149.8 353.5 C 144.5 354.3 129.4 356.6 128.9 355.7 C 126.6 346.4 130.6 341.2 135.7 338.6 C 143 335.8 155.8 330.7 157.4 331.6 C 158.8 332.5 163 336.9 158.8 347.5 C 157 351 154 352.7 149.9 353.5 Z",
    abs_4:
      "M 136.9 396.6 C 134.9 392.3 128 370.8 128.9 367.2 C 130 361.4 136.2 359.2 140.8 359.3 C 152.6 360.5 158.5 355.7 162.3 357.1 C 163.2 357.4 160.4 380.3 161.6 424.7 C 160.3 427.3 147.1 418.6 144.3 413.1 C 142.6 410 139.8 404.8 136.8 396.6",
    quad_mid:
      "M 117.4 415.1 C 120.2 416.3 132.6 447.6 133.5 456.5 C 134.2 459.9 133.1 477.8 128.7 492.9 C 127 498.6 125.7 510.3 124.8 521 C 123.6 535.2 121.2 557.3 119.2 571.4 C 118.7 573 115.2 578 112.3 571.9 C 105.7 553.3 103.6 533.8 101.2 518.7 C 97.9 501.8 98.7 482.8 99.2 471.5 C 100.4 454.4 102.8 441.6 106.4 432.8 C 110 421.7 116.6 414.6 117.4 415 Z",
    quad_outer:
      "M 95.1 465.2 C 96.1 476.9 95.5 489.1 95.8 501.1 C 95.9 515.1 98.2 528.6 99.2 539.8 C 100.5 551.9 104.7 563.1 103.6 570.8 C 103 575 100.1 575.8 96.1 570.3 C 92.2 564.7 86.5 552.7 85.7 548.3 C 83.6 535.8 84 519.2 84.8 507 C 86.4 492.2 92.3 477.2 94.6 465.4 C 94.7 465.1 94.9 464.2 95.1 465.1 Z",
    quad_inner:
      "M 138.5 466.7 C 143.4 470.1 146.5 482.6 146.9 496.6 C 147 500.6 147.5 517.1 144.3 530.9 C 141.1 546.2 138.9 552.2 137.3 556.8 C 135.5 560.9 132.5 571 130.1 570.5 C 127.2 569.5 126.1 562.6 126.6 554.7 C 127.8 535.2 130 516.5 132.7 504.6 C 135.7 491.8 138.5 477.4 138.2 472.1 C 138.1 469.7 137.8 466.5 138.4 466.6",
    calves_outer:
      "M 107.2 722.2 C 103.8 704 98.8 686.6 97.4 669.3 C 96.4 659.3 95.8 647.8 98.2 640.3 C 99.5 635.8 101.6 631.7 103.3 629.4 C 104.5 627.8 105.3 627.4 106 629.4 C 107.1 632.9 107.8 638.8 108 642.9 C 108.4 649.4 108.9 655.9 108.8 663.6 C 108.6 671.1 109 680.1 108.6 688.6 C 108.1 699.8 107.7 711 107.2 722.2 Z",
    calves_inner:
      "M 123.9 731.6 C 121.5 717.1 122.1 702.6 121.7 690 C 121.8 677.4 122.7 664 123.5 652.8 C 123.9 646 124.6 639.4 125.7 634.9 C 126.3 632.5 127.4 632.5 128.4 634.9 C 131.5 642.6 133.7 652.2 133.9 659.4 C 134.5 670.9 134.5 682.2 133.5 692.1 C 131.8 705.1 126.6 717.1 123.9 731.6 Z",
  },
  {
    id: "male_back",
    traps:
      "M 165 122 C 170.8 125.1 182.7 142.8 186.3 146 C 188.4 148.2 195 154.8 213.6 165.7 C 222.1 171.6 227.2 180.5 228.5 185.7 C 230.8 192.2 224.4 189.5 221.1 188.8 C 212.8 187 179.1 178.2 165.1 176.2 C 148.4 178.8 129.2 183.9 110.7 189 C 101.8 191.2 99.3 189.6 102 184 C 105.4 174.9 111 169.7 116.2 165.7 C 126.5 159.2 135.2 153.6 144.3 145.3 C 152.4 137.3 159.5 124.3 164.9 122.1 Z",
    shoulder:
      "M 94.1 185.2 C 91.5 185.2 87.5 194.3 80.6 208.1 Q 74.1 220.5 55.6 238.7 C 46.6 248.6 45.6 244.8 45 242.1 C 28.3 190.9 67 175 77.9 173.9 C 84.7 179.8 91.7 183.4 94 185.2 Z",
    tricep:
      "M 72.5 286.1 Q 64.6 330.4 55.5 332.9 C 50.6 331.1 45.2 299.8 43.6 294.3 C 39.9 278.9 43 271.3 44.9 265.9 C 48.8 255.9 52.9 253.6 59 253.1 C 66.5 253.1 72.5 258.6 73.5 261.8 C 74.5 263.8 74.1 279.9 72.5 286 Z",
    mid_back:
      "M 165 314 C 149.3 303.5 140.1 282.2 136.9 273.4 C 132.8 260.3 128.3 245.9 123.9 236.3 C 121.4 230.9 109.5 217.1 111.1 209 C 113 201 119 199 124.5 197.2 C 138.6 192.7 161 185.2 164.6 185.2 C 168.3 185.2 192.4 193.4 203.1 196.1 C 212.3 198.7 218.6 204.6 218.8 210 C 219 220.5 210.4 227.6 206.2 236.4 C 200.3 247.1 197.3 260.9 192.9 273.1 C 186.5 292.2 174.2 307.7 165 314 Z",
    forearm_outer:
      "M 49 411.3 Q 53.8 435.7 50.1 437.1 Q 46.1 438 40.3 411.6 Q 35.6 387.4 39.2 386.6 Q 43.3 385.6 48.9 411.3",
    forearm_inner:
      "M 69.8 353.6 Q 71.6 358.4 69.1 360.4 Q 65.4 361.4 63.3 356.1 Q 61.2 350 64.1 349.1 Q 67.5 349.5 69.8 353.6",
    forearm_mid:
      "M 66.6 369.2 C 70.8 390.6 63 433.6 55.9 435.9 C 56.7 408.9 49.1 393.6 41.3 377.9 C 36.5 361.6 44.5 342.3 46.3 343 C 56.3 346.8 66.4 366.2 66.6 369.2",
    lats: "M 86.3 254 C 98 251.6 109.9 255.4 116.8 259.7 C 121.8 263.1 128.1 270.3 129.9 274.3 C 132.6 279.1 138.7 294.4 143 299.9 C 149.8 308.2 149.7 315.8 149.1 319.5 C 147.6 328.6 142.5 336.8 137.5 347.9 C 135.1 352.7 133.8 359.2 133.4 366.1 C 133.1 368.6 131.2 367.3 129.5 365.8 C 123.2 360.6 115.6 353 112.4 347.1 C 107.9 340.4 106.8 331.6 105.5 324.4 C 103.3 312 102 301.6 100.1 295.8 C 96.8 281.8 90.9 268 86.3 254 Z",
    lower_back:
      "M 165 318.3 C 170.8 324.4 175.9 330.5 179.5 338.3 C 182.7 344.8 185.5 352 184.9 358.6 C 183.8 365.5 182.2 368.6 177.5 371.9 C 173.6 374.4 169.3 374.2 165.1 374.2 C 160.7 374.1 156 374 152.3 372 C 147.8 369.3 144.8 364.1 144.8 358 C 145.1 350.4 146.5 344.2 149.8 338.2 C 154.1 330.7 158.9 323.7 165 318.3",
    glute:
      "M 122 373 C 128.7 371.6 136.6 377.5 141.5 381.1 C 147.1 385.5 152.4 389.9 154.7 395.7 C 156.9 401.6 157 416.1 157.1 425.6 C 157.2 433.1 156.5 440.6 152.4 444.7 C 148 448.4 142.5 449.4 136.8 449.9 C 130.3 450.5 123.4 450.9 117.1 449.5 C 111.6 448 108 443.7 107.2 439.2 C 105.8 431.6 105.4 424.1 106.5 416.5 C 108 407.8 110.7 399.8 113.4 392 C 115.7 384.8 118.2 378.7 122 373 Z",
    hamstrings_outer:
      "M 115 453.3 C 118.5 462.4 119.7 472.1 119.8 481.6 C 119.8 492.8 119.4 504.5 117.5 515.8 C 115.9 525.8 113.7 535.3 110.2 544.1 C 106.5 553.9 102.8 563.4 99.3 573.3 C 98.4 575.5 96.9 576.1 96.5 573.1 C 94.4 562.5 92 552.1 91.5 541.4 C 91 528.6 91 514.5 92 504.3 C 93.6 491.7 96 480 101.5 469.9 C 105.4 463 108.9 455.7 115 453.3 Z",
    hamstrings_inner:
      "M 127.5 457 C 135.3 464.2 137.7 472.9 140.6 480.7 C 143.3 488.4 144.8 495.6 145.1 502.8 C 145.1 512.8 145.2 522.6 142.9 531.9 C 140.3 543.5 137.4 554.4 132.6 565.4 C 131.5 568 130.7 567.8 130.2 565.9 C 128.9 560.1 127.8 554.4 126.7 548.8 C 125.8 544 124.6 537.7 124.3 532.1 C 123.9 524.1 123.5 515.5 123.3 507.2 C 123 499.4 122.9 491.5 123.6 483.9 C 124 477.4 126.2 471.6 126.8 465.3 C 127.2 462.7 127.1 459.7 127 456.5 Z",
    calves_outer:
      "M 106 616.7 C 111.6 622.7 113.4 646.4 113.3 652.2 C 113.3 666.2 113.6 689 108.3 695.3 C 106.5 696.9 104.6 696.2 103.2 694.1 C 98.4 685.8 97.4 676 96.7 666.2 C 96.1 655.1 95.5 644 97.1 633.4 C 98.2 626.9 98.8 620.4 101.8 616.9 C 103.5 615.1 104.5 615.2 106 616.7 Z",
    calves_inner:
      "M 125.1 618.7 C 130.2 627.7 131.7 639 132.6 648.9 C 133.2 657.4 134.1 665.7 133.9 673.8 C 133.8 681.4 133.5 692.8 131.3 696.7 C 129.7 699.6 126.5 700.4 124.8 696.6 C 121.7 689.1 120 681.2 118.9 673.2 C 117.9 665.8 117.3 658.2 117.2 650.3 C 117 641.3 117.4 632.4 119.1 623.8 C 119.5 622 120.1 620.1 120.9 618.7 C 121.9 617.1 124 617.2 125 618.7 Z",
  },
  {
    id: "female_front",
    traps:
      "M 129.5 159.6 Q 140.2 165.3 133.3 180 Q 128.5 181.1 113.9 178.8 T 96.3 172.1 C 106.5 169.5 120.6 163.1 129.3 159.6 Z",
    pecs: "M 156 205.9 C 159.4 216.9 157 251.1 154.8 255.6 Q 147.5 269.8 120.1 259.9 C 102.6 251.4 96.1 237.1 93.5 233.6 C 91.1 228.9 85.5 221.8 86.7 215.7 C 90 205.2 95 199.1 97 197 C 105.1 185.7 121.7 189.4 128.1 190.2 C 141 192.1 149.8 193.8 156 205.8 Z",
    shoulder:
      "M 94.5 186.7 C 80.4 207.1 68.3 221.9 60.8 229 Q 57.4 231.9 52.5 234.2 C 50.5 234.8 48 217.9 48.9 205.1 C 50.5 186.3 67 175 85.1 174.4 C 88.8 176 95.5 179.7 97.2 182.1 Z",
    bicep:
      "M 80.5 291.8 Q 72.7 329.7 60.5 328.5 Q 47.4 325.5 53.3 288.8 Q 60.6 255.3 73 256.9 Q 85.3 259 80.5 291.8",
    forearm_outer:
      "M 56.7 407.1 Q 59.9 428.2 58 428.5 Q 55.5 428.9 50.5 407.3 Q 46.4 383.8 48.8 382.9 Q 51.4 382.4 56.7 407.1 Z",
    forearm_inner:
      "M 76.2 350.8 Q 77.3 355.2 75.1 356.5 Q 72.3 357.7 70.3 352.2 Q 68.9 347.3 71.5 346.3 Q 74.6 345.3 76.2 350.8 Z",
    forearm_mid:
      "M 73.3 367.1 C 76.3 384 70.2 423.4 64.6 423.7 C 64.3 396 56.2 390.4 49.6 370.1 C 47.1 362.9 52.4 339.9 54.8 341 C 64.1 345.9 71.8 359.4 73.3 367.1 Z",
    obliques:
      "M 95.1 255 C 101.8 263.3 105.3 265.4 114.1 277.5 C 116.7 281.2 117 285.3 116.4 288.7 C 115.8 292.4 113.5 295.8 107 295.1 C 114.1 294.6 121.5 306.4 121.8 312.6 C 121.9 319.1 117.6 321.2 111.8 319.7 C 118.9 320.1 124.1 330.4 125.2 334.7 C 125.9 337.2 126.7 342.5 125.5 344.8 C 124.3 347.8 122.1 348.9 119.1 348.6 C 116.5 348.3 115.5 347.1 111.8 345.7 C 119 347.6 124.1 356.1 123.5 361.2 C 122.8 366.4 120.1 368.3 117.9 368.9 C 114.2 369.8 113.1 370.1 106.3 365.1 C 112.7 368.6 116.5 373 119.3 377.7 C 122.4 384.2 121.6 391.4 120.3 395.6 C 119.3 398.8 116.2 402.4 113 401.3 C 106.6 399.6 100.7 396.2 95.6 392.3 C 103.2 374.8 112.5 347.3 113 339.1 C 113.8 322.9 109.1 306.3 105.7 290.5 C 103.2 278.5 97.7 266.7 95.1 255",
    abs_1:
      "M 153.1 292.2 C 147.1 296.6 134.6 302.6 131.8 301.4 C 126.6 298.7 132.2 283.5 138 278.5 C 148 270.6 157.3 267.5 159.3 270 C 161.8 273.2 160.9 287.1 153.2 292.1 Z",
    abs_2:
      "M 150.8 326.1 C 150.2 326.5 131.1 330.1 128.8 323 C 127.4 317.7 132.8 312.4 137.6 309.8 C 146.1 304.9 153.3 300.2 155 298.1 C 160.3 304.1 159.9 319.1 155.2 323.6 Q 153.7 325 150.8 326.1 Z",
    abs_3:
      "M 152 353.2 C 146.8 354.2 133.6 356.2 133 355.1 C 131.3 351 132.7 342.5 137.5 340.1 C 144.9 336.6 157.6 330.9 159.1 331.7 C 160.7 332.7 164 337.9 160.5 346.8 C 158.7 350.5 156 352.2 152 353.2 Z",
    abs_4:
      "M 139.7 393.9 C 138.5 389.3 131 370 133.4 364.8 C 135.3 361.2 138.2 359.7 142.4 359.8 C 159.4 360.5 159.5 355.7 163.3 357.1 C 164.2 357.4 161.4 380.3 162.7 424.1 C 161.3 425.7 150.9 420.1 146.6 412.1 C 144.2 407 142.8 403 139.7 393.9 Z",
    quad_mid:
      "M 123.7 408.8 C 124.3 409.4 136.3 435.1 137.3 446.9 C 138.3 458.2 135 468 133 482.9 C 130.7 493.1 129.2 503.6 128.9 514.6 C 127.4 528.8 125.4 551.1 124.6 555 C 124.3 557.3 121.1 558.4 119.7 555.8 C 116.1 548.5 112.2 526.2 110.7 511.6 C 108.6 493.4 106.3 478.9 107.8 464.2 C 108.9 447.5 110.5 434.4 113.7 425.8 C 117.8 415.3 122.6 406.9 123.6 408.7 Z",
    quad_outer:
      "M 103.6 457.2 C 104.6 468.9 104 481.1 104.3 493.1 C 104.4 507.1 106.7 520.6 108.1 531.7 C 110 543 111.3 546.7 111.1 554.1 C 111 556.5 109.3 558 106.2 554.8 C 101.5 549.3 98.7 543.9 96.5 536.1 C 94.6 527.8 94.6 511.8 95 499 C 94.9 484.2 100.8 469.2 103.1 457.4 C 103.2 457.1 103.5 456.2 103.6 457.2 Z",
    quad_inner:
      "M 142.4 457.6 C 146.8 461.4 149.2 473.2 149.4 487.7 C 149.3 492.1 149.6 506.3 146 520.3 C 142.1 535.6 141.1 540.2 138.9 546.2 C 137.8 549.7 136.4 553.5 134.9 553.5 C 133.1 553.4 131.6 547.5 131.8 543.4 C 132.6 526.5 134.3 508 136.8 495.7 C 139.3 482.3 142.4 471.2 142.1 463.1 C 141.9 460.4 141.9 457.2 142.4 457.6",
    calves_outer:
      "M 110.7 713.2 C 107.3 695 102.3 677.6 100.9 660.3 C 99.9 650.3 99.3 638.8 101.7 631.3 C 103 626.8 105.1 622.7 106.8 620.4 C 108 618.8 108.8 618.4 109.5 620.4 C 110.6 623.9 111.3 629.8 111.5 633.9 C 111.9 640.4 112.4 646.9 112.3 654.6 C 112.1 662.1 112.5 671.1 112.1 679.6 C 111.6 690.8 111.2 702 110.7 713.2 Z",
    calves_inner:
      "M 126.2 720.4 C 124 707.6 124.6 693.1 124.4 680.4 C 124.3 667.9 125.2 654.5 126 643.3 C 126.4 636.5 127.1 629.9 128.2 625.4 C 128.8 623 129.9 623 130.9 625.4 C 134 633.1 135.5 643.1 135.9 650 C 136.5 661.1 136.5 672.2 135.5 682.4 C 133.9 695.6 129.1 707.6 126.2 720.4 Z",
  },
  {
    id: "female_back",
    traps:
      "M 164.9 122.1 C 169.4 122.8 182.7 142.8 185.8 147.9 C 193.3 159.6 203.8 164.6 217 169.1 C 221.9 170.8 227.2 180.5 228.9 185.6 C 230.8 192.5 225 192 221.5 190.6 C 198.6 182.8 187.1 176.8 165.6 176.8 C 146.1 176.8 138.6 180.1 110.9 189.8 C 102 193 99.6 189.9 101.7 184 C 105.7 174.5 111.1 168.7 117.7 166.8 C 129.1 163.6 142 152.8 146.2 145.2 C 152.1 136.7 159.8 122.9 164.9 122.1 Z",
    shoulder:
      "M 96.3 183.5 C 93.5 186.2 89.4 194.9 85.4 206 Q 81 218.9 59.7 243.1 C 57.4 245.6 56.5 245.4 55.1 243.1 C 34.3 195.8 69.8 176.3 79.9 174.9 C 86 179.1 92 182.3 96.3 183.5 Z",
    tricep:
      "m 79.5 288.6 Q 71 331.4 65.2 331.7 C 60.2 332 58.4 314.1 53.7 297 C 50.7 283.7 52.3 274.6 54.7 268.4 C 58.2 260.2 60.7 257 67.6 256.7 C 74 256.6 78.9 260.9 80.4 264 C 82 267.4 81.1 282.4 79.5 288.5 Z",
    mid_back:
      "M 165.4 313.6 C 156 308.6 146 291 139.5 272.4 C 135.5 260.2 131 243.5 126.9 233.7 C 123 226.9 115.9 219.4 116 211.3 C 116.5 203.4 123.4 198.2 127.5 197.2 C 139.3 193.8 161.1 185.4 164.6 185.2 C 168.3 185.2 192.4 193.4 201.6 196.9 C 210.4 200.3 213.5 205.2 214.2 210.8 C 214.8 218.8 209.4 225.5 203.8 234.1 C 198 245.5 195.1 258.1 191.5 271.7 C 184.9 291.1 174.4 308 165.6 313.6 Z",
    forearm_outer:
      "M 55.2 411.1 Q 58.6 434.6 56.5 435 Q 54.3 435.4 49 411.3 Q 44.9 387.8 47.3 386.9 Q 49.9 386.4 55.2 411.1 Z",
    forearm_inner:
      "M 75.5 354 Q 76.7 359.4 74.2 360.2 Q 71.7 360.8 69.6 355 Q 68.1 349.7 70.7 349.4 Q 73.7 349.3 75.5 354 Z",
    forearm_mid:
      "M 72.3 370.1 C 75.3 387 70.5 430.5 63.9 432.7 C 61.5 399.3 55.2 393.4 48.9 374.5 C 45.6 364 51.4 342.7 53.6 343.6 C 63.2 348.5 71.2 362.6 72.3 370.1 Z",
    lats: "M 101.8 256 C 114 255.1 122.6 257.7 129.1 264.8 C 133.3 269.7 137.3 275.1 138.9 281.8 C 141.1 289.5 145.1 296.8 149.4 304 C 153.5 311.2 153.2 317.8 152.3 323 C 151.1 330.2 146.4 338.1 143.8 345.6 C 141.4 352.2 140.4 357.1 140 364.3 C 140 366.5 138.7 367 136.8 365 C 133.8 361.9 128.7 355.9 125.2 350.6 C 119.9 342.2 118.8 334.1 117.8 326.5 C 115.3 313.4 114.3 303.2 113.3 297.3 C 110.4 283.4 105.9 270 101.8 256 Z",
    lower_back:
      "M 166 318.3 C 171.4 324.8 176.1 331.3 179.7 338.9 C 182.5 345.6 183.9 351.8 184 358.4 C 183.9 364.5 182.5 367.8 178.1 371.5 C 174.9 374 170.3 374.2 166.1 374.2 C 161.7 374.1 157 374 153.6 371.4 C 149.8 368.2 148 365.1 147.8 358.3 C 147.9 350.6 149.2 344.8 152.1 338.9 C 155.8 331.2 160.7 323.9 166 318.3 Z",
    glute:
      "M 122 373 C 128.7 371.6 136.6 377.5 141.5 381.1 C 147.1 385.5 152.4 389.9 154.7 395.7 C 156.9 401.6 157 416.1 157.1 425.6 C 157.2 433.1 156.5 440.6 152.4 444.7 C 148 448.4 142.5 449.4 136.8 449.9 C 130.3 450.5 123.4 450.9 117.1 449.5 C 111.6 448 108 443.7 107.2 439.2 C 105.8 431.6 105.4 424.1 106.5 416.5 C 108 407.8 110.7 399.8 113.4 392 C 115.7 384.8 118.2 378.7 122 373 Z",
    hamstrings_outer:
      "M 120.7 453.4 C 124 463.1 124.8 472.5 124.9 482.4 C 125.2 492.8 124.5 504.8 123.1 515.7 C 122 526.7 119.6 535.6 116.4 544.6 C 112.7 554.6 109.7 564.3 107.1 573.1 C 106.4 575.1 105 575.4 104.5 572.7 C 102.4 563.2 101.2 551.5 100.4 541.3 C 99.9 527.7 99.6 514.4 100.8 504.4 C 102.5 491.7 104.7 480.1 109 470.3 C 112.2 463 115.9 455.5 120.7 453.4 Z",
    hamstrings_inner:
      "M 131.7 456.6 C 137.9 464.2 141.2 473 143.9 482.5 C 145.2 488.5 146.6 495.4 147 503 C 147.1 512.8 147.2 521.8 145.2 531.5 C 142.1 543 140.6 554.3 136.4 564.7 C 135.6 566.9 134.5 566.4 134.1 564.7 C 133.4 560.1 132.3 554.4 131.3 549.3 C 130.3 544 129.1 537.7 128.8 532.1 C 128.4 524.1 128 515.5 127.8 507.2 C 127.5 499.4 127.4 491.5 128.1 483.9 C 128.5 477.4 130.7 471.6 131.3 465.3 C 131.7 462.7 131.6 459.7 131.5 456.5 Z",
    calves_outer:
      "M 110 614.7 C 115.2 620.6 116.9 644.6 116.9 650.7 C 117.1 664 116.8 685.6 112.5 692.7 C 111.2 694.7 108.8 694.5 107.3 692 C 103.7 685.1 102.1 674.5 101.5 663.9 C 101 653 101.1 641.7 101.8 631.2 C 102.6 625.2 103.3 618.8 105.8 614.9 C 107.5 613.1 108.5 613.2 110 614.7 Z",
    calves_inner:
      "M 127.2 616.6 C 129.7 621.5 133.8 638.7 134.7 647.7 C 135.1 656 135.8 664.5 135.9 672.4 C 135.7 679.2 134.7 689.4 133.5 694.1 C 132.7 696.8 129.2 697.5 127.5 694.8 C 124.7 689.9 123.3 679.4 122.1 671.3 C 121.1 663.8 120.6 656.2 120.3 648.1 C 120.1 639.4 120.4 630.4 122.2 621.7 C 122.5 620 123.1 617.9 123.9 616.6 C 124.7 615.5 126.7 615.8 127.2 616.6 Z",
  },
];

const allMuscles = [
  "Traps",
  "Chest",
  "Shoulders",
  "Biceps",
  "Forearms",
  "Obliques",
  "Abdominals",
  "Quads",
  "Calves",
  "Triceps",
  "Traps (mid-back)",
  "Lats",
  "Lower back",
  "Glutes",
  "Hamstrings",
];

const colourPalette = [
  "#FFCDD2",
  "#F8B1B1",
  "#ED9696",
  "#E27B7B",
  "#D86060",
  "#CE4545",
  "#C42A2A",
  "#BB0F0F",
  "#B40000",
  "#9D0000",
  "#870000",
];

export { musclesConst, allMuscles, colourPalette };
