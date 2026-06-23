// Course Data
const courseData = {
    sportsMassage: [
        { title: "Basic Sports Massage Care", time: "60분", price: "80,000₩", desc: "전신 건식 테라피로 뭉친 근육 이완" },
        { title: "Standard Sports Massage Care", time: "90분", price: "100,000₩", desc: "전신 건식 + 집중 관리" },
        { title: "Premium Sports Massage Care", time: "120분", price: "120,000₩", desc: "머리부터 발끝까지 완벽한 힐링" }
    ],
    oil: [
        { title: "Basic Aroma Care", time: "60분", price: "90,000₩", desc: "천연 아로마 오일을 이용한 부드러운 관리" },
        { title: "Standard Aroma Care", time: "90분", price: "110,000₩", desc: "림프 순환과 심신 안정을 위한 테라피" },
        { title: "Premium Aroma Care", time: "120분", price: "130,000₩", desc: "지친 몸과 마음에 활력을 주는 풀코스" }
    ],
    healing: [
        { title: "Basic Healing Care", time: "60분", price: "100,000₩", desc: "부드러운 감성 테라피의 정석" },
        { title: "Standard Healing Care", time: "90분", price: "120,000₩", desc: "심신의 안정을 주는 프리미엄 힐링" },
        { title: "Premium Healing Care", time: "120분", price: "140,000₩", desc: "최상의 만족을 선사하는 VIP 힐링" }
    ],
    vip: [
        { title: "VIP 스포츠마사지 + 오일", time: "90분", price: "120,000₩", desc: "스포츠마사지와 오일을 함께 구성한 조합 코스" },
        { title: "VIP 스포츠마사지 + 감성힐링", time: "90분", price: "140,000₩", desc: "스포츠마사지와 감성힐링을 함께 구성한 조합 코스" },
        { title: "VIP 스포츠마사지 + 감성힐링 + 발", time: "90분", price: "160,000₩", desc: "스포츠마사지, 감성힐링, 발 관리를 함께 구성한 조합 코스" },
        { title: "VIP 스포츠마사지 + 오일", time: "120분", price: "140,000₩", desc: "여유 있게 진행하는 스포츠마사지와 오일 조합 코스" },
        { title: "VIP 스포츠마사지 + 감성힐링", time: "120분", price: "160,000₩", desc: "여유 있게 진행하는 스포츠마사지와 감성힐링 조합 코스" },
        { title: "VIP 스포츠마사지 + 감성힐링 + 발", time: "120분", price: "180,000₩", desc: "여유 있게 진행하는 스포츠마사지, 감성힐링, 발 조합 코스" },
        { title: "프리미엄 VVIP 스포츠마사지 + 오일 + 발", time: "150분", price: "200,000₩", desc: "스포츠마사지, 오일, 발 관리를 함께 구성한 프리미엄 코스" },
        { title: "프리미엄 VVIP 스포츠마사지 + 감성힐링 + 발", time: "150분", price: "220,000₩", desc: "스포츠마사지, 감성힐링, 발 관리를 함께 구성한 프리미엄 코스" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Floating Header Scroll Effect
    const header = document.querySelector('.floating-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Tab Switching Logic
    window.switchTab = (tabName) => {
        // Update Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update Content
        const contentContainer = document.getElementById('course-content');
        const data = courseData[tabName];

        // Fade Out
        contentContainer.style.opacity = '0';
        contentContainer.style.transform = 'translateY(10px)';
        contentContainer.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            // Generate HTML
            let html = '<div class="space-y-4">';
            data.forEach(item => {
                html += `
                    <div class="flex justify-between items-center p-6 rounded-2xl bg-gray-50 hover:bg-yellow-50 transition-colors cursor-pointer group">
                        <div class="text-left">
                            <h4 class="font-bold text-lg group-hover:text-yellow-700">${item.title}</h4>
                            <p class="text-sm text-gray-500">${item.desc} (${item.time})</p>
                        </div>
                        <span class="font-bold text-xl">${item.price}</span>
                    </div>
                `;
            });
            html += '</div>';

            contentContainer.innerHTML = html;

            // Fade In
            contentContainer.style.opacity = '1';
            contentContainer.style.transform = 'translateY(0)';
        }, 300);
    };

    // 3. Floating Action Button (FAB)
    const fabMain = document.getElementById('fab-main');
    const fabOptions = document.getElementById('fab-options');

    fabMain.addEventListener('click', () => {
        fabMain.classList.toggle('active');
        fabOptions.classList.toggle('show');
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabMain.contains(e.target) && !fabOptions.contains(e.target)) {
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        }
    });

    // 4. Horizontal Scroll Buttons
    const snapContainer = document.querySelector('.snap-container');
    const prevBtn = document.querySelector('.fa-arrow-left').parentElement;
    const nextBtn = document.querySelector('.fa-arrow-right').parentElement;

    if (prevBtn && nextBtn && snapContainer) {
        prevBtn.addEventListener('click', () => {
            snapContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            snapContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // 5. Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to elements that need scroll reveal (if any additional ones are added)
    // Currently most are handled by CSS animation on load, but we can add more here.
});
