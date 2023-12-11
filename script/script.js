// Accordion
function toggleIcon(expandIconPlus, expandIconMinus, isOpen) {
	if (isOpen) {
		expandIconPlus.style.display = 'none'
		expandIconMinus.style.display = 'block'
	} else {
		expandIconPlus.style.display = 'block'
		expandIconMinus.style.display = 'none'
	}
}

function createAccordion(el) {
	let animation = null
	let isClosing = false
	let isExpanding = false
	const summary = el.querySelector('summary')
	const content = el.querySelector('.faq-content')
	const expandIconPlus = summary.querySelector('.icon-tabler-circle-plus')
	const expandIconMinus = summary.querySelector('.icon-tabler-circle-minus')

	function onClick(e) {
		e.preventDefault()
		el.style.overflow = 'hidden'
		if (isClosing || !el.open) {
			open()
		} else if (isExpanding || el.open) {
			shrink()
		}
	}

	function shrink() {
		isClosing = true
		const startHeight = `${el.offsetHeight}px`
		const endHeight = `${summary.offsetHeight}px`
		if (animation) {
			animation.cancel()
		}
		animation = el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 400,
				easing: 'ease-out',
			}
		)
		animation.onfinish = () => {
			toggleIcon(expandIconPlus, expandIconMinus, false)
			onAnimationFinish(false)
		}
		animation.oncancel = () => {
			toggleIcon(expandIconPlus, expandIconMinus, false)
			isClosing = false
		}
	}

	function open() {
		el.style.height = `${el.offsetHeight}px`
		el.open = true
		window.requestAnimationFrame(expand)
	}

	function expand() {
		isExpanding = true
		const startHeight = `${el.offsetHeight}px`
		const endHeight = `${summary.offsetHeight + content.offsetHeight}px`
		if (animation) {
			animation.cancel()
		}
		animation = el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 350,
				easing: 'ease-out',
			}
		)
		animation.onfinish = () => {
			toggleIcon(expandIconPlus, expandIconMinus, true)
			onAnimationFinish(true)
		}
		animation.oncancel = () => {
			toggleIcon(expandIconPlus, expandIconMinus, true)
			isExpanding = false
		}
	}

	function onAnimationFinish(open) {
		el.open = open
		animation = null
		isClosing = false
		isExpanding = false
		el.style.height = el.style.overflow = ''
	}

	summary.addEventListener('click', onClick)
}

document.querySelectorAll('details').forEach(createAccordion)

// LOCATIONS

// $('.hover').mouseleave(function () {
// 	$(this).removeClass('hover')
// })

// Header
const header = document.querySelector('.navbar-dark')
console.log(header)
window.onscroll = function () {
	const top = window.scrollY
	if (top >= 100) {
		header.classList.add('navbarDark')
	} else {
		header.classList.remove('navbarDark')
	}
}

const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach(l => {
	l.addEventListener('click', () => {
		new bootstrap.Collapse(menuToggle).toggle()
	})
})

// ////////////////////////////////////////////
// BOT
// ///////////////////////////////////////////
window.setInterval(function () {
	var elem = document.getElementById('response')
	elem.scrollTop = elem.scrollHeight
}, 500)

document.addEventListener('keyup', function (e) {
	if (e.keyCode == 13) {
		reply()
	}
})

function reply() {
	var input = document.getElementById('userInput').value
	var chatbox = document.getElementById('response')
	var userInput = input.toLowerCase()

	chatbox.innerHTML += "<br/> <span style='color: blue;'>Вы:</span> " + input

	var vocab = [
		'привет',
		'меня булят',
		'кто ты?',
		'меня массово булят',
		'я в душ',
		'да',
	]
	// 'я в душ',
	// 'помоги',
	// 'кто ты?',
	// 'кибербуллинг',
	// 'как защититься от кибербуллинга',
	// 'безопасность в сети',
	// 'привет',

	var ans = [
		'Приветствую! Чем могу помочь брат?',
		'Заблокируйте обидчика',
		'Я Чина, ассистент помошник для борьбы с кибербуллингом! Чем могу быть полезен',
		'Если вы столкнулись с массовым кибербуллингом - закройте свою страницу и оставьте доступ только для друзей',
		'И без меня?',
		'фтна',
	]
	// 'И без меня?',
	// 'У нас есть опытная команда специалистов и специализированные центры, где вам окажут помощь.',
	// 'Я ассистент-помощник, отвечаю на ваши простые вопросы. Более сложные вопросы вы можете задать специалисту.',
	// 'Наш сайт предоставляет информацию о кибербуллинге и ресурсы для борьбы с этой проблемой.',
	// 'Мы предлагаем советы и стратегии по предотвращению кибербуллинга, помогая вам защитить свой онлайн-опыт.',
	// 'Мы делимся информацией о том, как обеспечить свою безопасность в интернете и избежать кибербуллинга.',
	// 'Здравствуйте! Я молодой ассистент-помощник, я не обладаю большими знаниями, но могу вам подсказать где получить помощь',

	console.log(ans.length === vocab.length)
	console.log(ans.length)
	console.log(vocab.length)

	i = 0
	while (i < vocab.length) {
		var mb = "<br/><span style='color: red;'>Ассистент:</span> "
		var n = userInput.includes(vocab[i])

		if (n === true) {
			chatbox.innerHTML += mb + ans[i]
			break
		}

		i++

		if (n === false && i === vocab.length) {
			chatbox.innerHTML +=
				mb +
				'Извините, к сожалению я не могу ответить на этот вопрос, обратитесь к нашим психологам'
		}
	}
	document.getElementById('userInput').value = ''
}
