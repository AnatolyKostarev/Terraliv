'use strict'
import { data } from './data.js'

const $questionCard = document.querySelector('.js-cards-block')
const $popupBtn = document.querySelector('.js-button')
const $popupWindow = document.querySelector('.js-popup')
const $popupClose = document.querySelector('.js-close__btn')
const $video = document.querySelector('.js-video')
const $play = document.querySelector('.js-play__btn')

function renderCard(arr) {
  $questionCard.innerHTML = ''
  arr.forEach(item => {
    let divCard = document.createElement('div')
    divCard.classList.add('questionnaire-card')
    divCard.innerHTML = `<p class="questionnaire-number">${item.id} вопрос из 3</p>
                              <p class="questionnaire-subtitle">${item.question}</p>
                                <div class="questionnaire-item / js-question">
                                  <span class="questionnaire-border">${item.answer_1}</span>
                                </div>
                                <div class="response-item / js-response" hidden>
                                  <span class="questionnaire-border">${item.response_1}</span>
                                </div>
                                <div class="questionnaire-item / js-question">
        <span class="questionnaire-border">${item.answer_2}</span>
      </div>
      <div class="response-item / js-response" hidden>
        <span class="questionnaire-border">${item.response_2}</span>
      </div>
      <div class="questionnaire-item / js-question">
        <span class="questionnaire-border">${item.answer_3}</span>
      </div>
      <div class="response-item / js-response" hidden>
        <span class="questionnaire-border">${item.response_3}</span>
      </div>`
    $questionCard.append(divCard)
  })
}

renderCard(data)

const $question = document.querySelectorAll('.js-question')

const $response = document.querySelectorAll('.js-response')

function responseToggle(question, response) {
  return Array.from(question).map((elem, index) =>
    elem.addEventListener('click', () =>
      index === 0 || index === 3 || index === 6
        ? (elem.classList.toggle('active__correct'),
          Array.from(response).map((elem, i) => {
            return index === i ? elem.toggleAttribute('hidden') : null
          }))
        : (elem.classList.toggle('active__wrong'),
          Array.from(response).map((elem, i) => {
            return index === i ? elem.toggleAttribute('hidden') : null
          }))
    )
  )
}
responseToggle($question, $response)

$popupBtn.addEventListener('click', openPopup)
$popupClose.addEventListener('click', closePopup)
$play.addEventListener('click', playVideo)

function openPopup() {
  $popupWindow.removeAttribute('hidden')
  document.body.style.overflow = 'hidden'
  $video.removeAttribute('controls')
}

function closePopup() {
  $popupWindow.setAttribute('hidden', '')
  document.body.style.overflow = ''
  $video.pause()
  $video.currentTime = 0
  $video.removeAttribute('controls')
  $play.style.visibility = 'visible'
}

function playVideo() {
  $video.play()
  $video.setAttribute('controls', 'controls')
  $play.style.visibility = 'hidden'
}
