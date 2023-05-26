// boards.swagger.js

/**
 * @swagger
 * /openAPI/viewStation:
 *   get:
 *     summary: 역 정보 가져오기
 *     tags: [openAPI]
 *     parameters:
 *          - in: query
 *            name: stationName
 *            type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      stationName:
 *                          type: string
 *                          example: 가산디지털단지역
 *                      lineList:
 *                          type: array
 *                          items:
 *                              type: string
 *                          example: [1호선, 7호선]
 *                      rootList:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  startAt:
 *                                      type: object
 *                                      properties:
 *                                          line:
 *                                              type: string
 *                                          next:
 *                                              type: string
 *                                  endAt:
 *                                      type: object
 *                                      properties:
 *                                          line:
 *                                              type: string
 *                                          next:
 *                                              type: string
 *                          example:
 *                              startAt: {line: 1호선, next: 구로역}
 *                              endAt: {line: 7호선, next: 구로역}
 *                      returnValue:
 *                          type: bool
 *                          example: true
 */

/**
 * @swagger
 * /openAPI/viewRoot:
 *   get:
 *     summary: 환승 경로 가져오기
 *     tags: [openAPI]
 *     parameters:
 *          - in: query
 *            name: stationName
 *            type: string
 *          - in: query
 *            name: start
 *            type: string
 *          - in: query
 *            name: end
 *            type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      stationName:
 *                          type: string
 *                          example: 가산디지털단지역
 *                      root:
 *                          type: object
 *                          properties:
 *                              start:
 *                                  type: object
 *                                  properties:
 *                                      line:
 *                                          type: string
 *                                      nextStation:
 *                                          type: string
 *                              end:
 *                                  type: object
 *                                  properties:
 *                                      line:
 *                                          type: string
 *                                      nextStation:
 *                                          type: string
 *                          exmaple:
 *                              start: {line: 1호선, nextStation: 구로역}
 *                              end: {line: 1호선, nextStation: 철산역}
 *                      blockList:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  source:
 *                                      type:string
 *                                  destination:
 *                                      type: string
 *                                  content:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                          example: 
 *                              - source: B2층 1호선 승강장
 *                                destination: 2층 1호선 엘레베이터
 *                                content: [이러쿵, 저러쿵, 요리조리]
 *                              - source: 2층 7호선 개찰구
 *                                destination: 2층 7호선 승강장
 *                                content: [10m 전진, 우회전, 어쩌구저쩌구]
 *                      returnValue:
 *                          type: bool
 *                          example: true
 */