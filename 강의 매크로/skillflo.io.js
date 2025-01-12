async function playUnwatchedLecture() {
    const unwatchedLectureNode = document.querySelector("#app > section > aside > div > div > button")
    unwatchedLectureNode.click()
    await sleep(1)

    const unwatchedFirstLectureNode = document.querySelector("#portal-container > div > div > div > div > div > ul > li:nth-child(1) > div.css-w03yth.edxwcog0 > table > tbody > tr:nth-child(1) > td.unwatched-section-button")
    if(!unwatchedFirstLectureNode){
        console.log('재귀 종료: ' ,new Date());
        return
    }
    unwatchedFirstLectureNode.click()
    await sleep(1)

    const unwatchedLectureNode2 = document.querySelector("#app > section > aside > div > div > button")
    unwatchedLectureNode2.click()
    await sleep(1)

    const unwatchedFirstLectureNode2 = document.querySelector("#portal-container > div > div > div > div > div > ul > li:nth-child(1) > div.css-w03yth.edxwcog0 > table > tbody > tr:nth-child(1) > td.unwatched-section-button")
    if(!unwatchedFirstLectureNode2){
        console.log('재귀 종료: ' ,new Date());
        return
    }
    unwatchedFirstLectureNode2.click()
    await sleep(1)
    
    const startTimeNode = Array.from(unwatchedFirstLectureNode.childNodes)[1].nodeValue
    const endTimeNode = Array.from(unwatchedFirstLectureNode.childNodes)[3].nodeValue
    const diffInSeconds = getTimeDifferenceInSeconds(endTimeNode, startTimeNode)
    
    console.log(`${startTimeNode} ~ ${endTimeNode} : ${diffInSeconds} 초 대기`);
    await sleep(diffInSeconds / 2 + 1) // 2배속으로 재생.

    const showToFirstNode = document.querySelector("#portal-container > div > div > footer > button.fc-button.custom-text.css-pvcp6e")
    if(showToFirstNode){
        showToFirstNode.click()
        await sleep(1)
    }

    playUnwatchedLecture()
}
playUnwatchedLecture()

function sleep(second) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
}

function getTimeDifferenceInSeconds(time1, time2) {
    // 시간 문자열을 "시:분:초"로 분리
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);
  
    // 각 시간을 초 단위로 변환
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
  
    // 두 시간의 차이를 절대값으로 계산
    const diffInSeconds = Math.abs(totalSeconds1 - totalSeconds2);
  
    return diffInSeconds
}
