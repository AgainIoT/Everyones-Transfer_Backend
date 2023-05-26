// openAPI.swagger.js

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
 *         description: \[ 성공 \]
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
 *       403:
 *         description: \[ 실패 \] 잘못된 Query 요청
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 100
 *                      errMsg:
 *                          type: string
 *                          example: Incorrect query
 *       404:
 *         description: \[ 실패 \] 역 이름이 존재하지 않거나 데이터가 수집되지 않음
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 101
 *                      errMsg:
 *                          type: string
 *                          example: Data was not collected or this station doesn't exist
 *       500:
 *         description: \[ 실패 \] 예기치 않은 서버 오류
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 102
 *                      errMsg:
 *                          type: string
 *                          example: Server Error Occured
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
 *                                          example: 1호선
 *                                      nextStation:
 *                                          type: string
 *                                          example: 구리역
 *                              end:
 *                                  type: object
 *                                  properties:
 *                                      line:
 *                                          type: string
 *                                          example: 7호선
 *                                      nextStation:
 *                                          type: string
 *                                          example: 철산역
 *                          exmaple:
 *                              start: {line: 1호선, nextStation: 구로역}
 *                              end: {line: 1호선, nextStation: 철산역}
 *                      blockList:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  source:
 *                                      type: string
 *                                      example: 1호선
 *                                  destination:
 *                                      type: string
 *                                  content:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                          example: 
 *                              - source: B1층 1호선 승강장
 *                                destination: B1층 1호선 대합실
 *                                content: [100m 전진, 좌회전, 20m 전진]
 *                              - source: B1층 1호선 대합실
 *                                destination: B1층 7호선 승강장
 *                                content: [우회전, 100m 전진]
 *                      returnValue:
 *                          type: bool
 *                          example: true
 *       403:
 *         description: \[ 실패 \] 잘못된 Query 요청
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 100
 *                      errMsg:
 *                          type: string
 *                          example: Incorrect query
 *       404:
 *         description: \[ 실패 \] 역 이름이 존재하지 않거나 데이터가 수집되지 않음
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 101
 *                      errMsg:
 *                          type: string
 *                          example: Data was not collected or this station doesn't exist
 *       500:
 *         description: \[ 실패 \] 예기치 않은 서버 오류
 *         content:
 *           application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      returnValue:
 *                          type: bool
 *                          example: false
 *                      errCode:
 *                          type: integer
 *                          example: 102
 *                      errMsg:
 *                          type: string
 *                          example: Server Error Occured
 */