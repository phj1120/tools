const unwatchedLectureSelector = "#app > section > aside > div > div > button";
const firstUnwatchedLectureSelector = "#portal-container > div > div > div > div > div > ul > li:nth-child(1) > div.css-w03yth.edxwcog0 > table > tbody > tr:nth-child(1) > td.unwatched-section-button"
const showToFirstSelector = "#portal-container > div > div > footer > button.fc-button.custom-text.css-pvcp6e"

await playUnwatchedLecture()

async function playUnwatchedLecture() {
    await refreshWatchedHistory();

    const firstUnwatchedLectureNode = await getFirstUnwatchedLectureNode();
    if (!firstUnwatchedLectureNode) {
        console.log('재귀 종료: ', new Date());
        return;
    }
    await clickNode(firstUnwatchedLectureNode)

    await waitToWatchingDone(firstUnwatchedLectureNode);

    await playUnwatchedLecture();
}

async function refreshWatchedHistory() {
    const unwatchedFirstLectorNode = await getFirstUnwatchedLectureNode();
    if (unwatchedFirstLectorNode) {
        await clickNode(unwatchedFirstLectorNode)
    }
}

async function getFirstUnwatchedLectureNode() {
    const unwatchedLectureNode = document.querySelector(unwatchedLectureSelector);
    await clickNode(unwatchedLectureNode);

    return document.querySelector(firstUnwatchedLectureSelector)
}

async function waitToWatchingDone(firstUnwatchedLectureNode) {
    const startTimeNode = Array.from(firstUnwatchedLectureNode.childNodes)[1].nodeValue
    const endTimeNode = Array.from(firstUnwatchedLectureNode.childNodes)[3].nodeValue
    const diffInSeconds = getTimeDifferenceInSeconds(endTimeNode, startTimeNode)

    const waitSeconds = diffInSeconds / 2 // 배속고려(2배속으로 본다고 가정)
    console.log(`${startTimeNode} ~ ${endTimeNode} : ${waitSeconds} 초 강의 재생`);

    await sleep(waitSeconds + 1)

    await removeWatchToFirstModal()
}

async function removeWatchToFirstModal() {
    const showToFirstNode = document.querySelector(showToFirstSelector)
    if (showToFirstNode) {
        await clickNode(showToFirstNode)
    }
}

function getTimeDifferenceInSeconds(time1, time2) {
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

    return Math.abs(totalSeconds1 - totalSeconds2);
}

async function clickNode(node) {
    if (node?.click) {
        node.click()
    }
    await sleep(1)
}

function sleep(second) {
    return new Promise(resolve => setTimeout(resolve, second * 1000));
}