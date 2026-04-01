        // Мобильное меню
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
        
        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Изменение прозрачности навигации при прокрутке
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.padding = '0';
            } else {
                header.style.background = 'white';
                header.style.padding = '';
            }
        });
        
        // Слайдер отзывов
        const reviews = document.querySelectorAll('.review');
        const reviewDots = document.querySelectorAll('.review-dot');
        let currentReview = 0;
        
        function showReview(index) {
            reviews.forEach(review => review.classList.remove('active'));
            reviewDots.forEach(dot => dot.classList.remove('active'));
            
            reviews[index].classList.add('active');
            reviewDots[index].classList.add('active');
            currentReview = index;
        }
        
        reviewDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showReview(index);
            });
        });
        
        // Автоматическая смена отзывов
        setInterval(() => {
            let nextReview = currentReview + 1;
            if (nextReview >= reviews.length) {
                nextReview = 0;
            }
            showReview(nextReview);
        }, 5000);
        
        const galleryTrack = document.getElementById('galleryTrack');
        const galleryNav = document.getElementById('galleryNav');
        const slides = document.querySelectorAll('.gallery-slide');
        let currentGallerySlide = 0;
        let autoSlideInterval;
        
        // Определяем количество слайдов в зависимости от ширины экрана
        function getSlidesPerView() {
            const width = window.innerWidth;
            if (width >= 1200) return 3;
            if (width >= 992) return 2;
            return 1;
        }
        
        // Создание навигационных точек для галереи
        function initGalleryNav() {
            galleryNav.innerHTML = '';
            const slidesPerView = getSlidesPerView();
            const totalSlides = slides.length;

            slides.forEach(slide => {
                slide.style.flex = `0 0 ${100 / slidesPerView}%`;
            });
            
            const totalPages = totalSlides + 2;
            
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('gallery-dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('data-index', i);
                galleryNav.appendChild(dot);
                
                dot.addEventListener('click', () => {
                    goToGallerySlide(i);
                });
            }
            

            goToGallerySlide(0);
        }
        
        function goToGallerySlide(index) {
            const slidesPerView = getSlidesPerView();
            currentGallerySlide = index;
            const translateX = -index * (100 / slidesPerView) * slidesPerView;
            galleryTrack.style.transform = `translateX(${translateX}%)`;
            updateGalleryDots();
        }
        
        function updateGalleryDots() {
            document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentGallerySlide);
            });
        }
        
        function nextGallerySlide() {
            const slidesPerView = getSlidesPerView();
            const totalSlides = slides.length;
            const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
            
            if (currentGallerySlide >= maxSlide) {
                currentGallerySlide = 0;
            } else {
                currentGallerySlide++;
            }
            
            goToGallerySlide(currentGallerySlide);
        }
        
        // Инициализация галереи при загрузке
        initGalleryNav();
        
        // Переинициализация галереи при изменении размера окна
        window.addEventListener('resize', function() {
            initGalleryNav();
            clearInterval(autoSlideInterval);
            startAutoSlide();
        });
        
        // Запуск автоматической прокрутки
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextGallerySlide, 4000);
        }
        
        // Останавливаем автопрокрутку при наведении на галерею
        galleryTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        galleryTrack.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Запускаем автопрокрутку
        startAutoSlide();
        
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        });
        
        function initHorizontalScroll() {
            const tracks = document.querySelectorAll('.events-scroll-track');
            const prevButtons = document.querySelectorAll('.scroll-btn.prev');
            const nextButtons = document.querySelectorAll('.scroll-btn.next');
            
            tracks.forEach((track, index) => {
                const scrollAmount = window.innerWidth >= 768 ? 350 : 250;
                
                nextButtons[index].addEventListener('click', () => {
                    track.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                });
                
                prevButtons[index].addEventListener('click', () => {
                    track.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                });
                
                // Автоматическая прокрутка
                let autoScrollInterval = setInterval(() => {
                    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                        setTimeout(() => {
                            track.scrollTo({
                                left: 0,
                                behavior: 'smooth'
                            });
                        }, 2000);
                    } else {
                        track.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }, 5000);
                
                track.addEventListener('mouseenter', () => {
                    clearInterval(autoScrollInterval);
                });
                
                track.addEventListener('mouseleave', () => {
                    autoScrollInterval = setInterval(() => {
                        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                            setTimeout(() => {
                                track.scrollTo({
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }, 2000);
                        } else {
                            track.scrollBy({
                                left: scrollAmount,
                                behavior: 'smooth'
                            });
                        }
                    }, 5000);
                });
            });
        }
        
        // Инициализация горизонтальной прокрутки после загрузки страницы
        document.addEventListener('DOMContentLoaded', initHorizontalScroll);
        
        // Переинициализация при изменении размера окна
        window.addEventListener('resize', initHorizontalScroll);