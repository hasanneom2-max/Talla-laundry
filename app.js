// قائمة الخدمات والقطع المتاحة
const items = [
    { id: 1, name: "قميص / تيشيرت" },
    { id: 2, name: "بنطلون (جينز / قماش)" },
    { id: 3, name: "بدلة كاملة (2 قطعة)" },
    { id: 4, name: "فستان" },
    { id: 5, name: "جاكيت / بالطو" },
    { id: 6, name: "مفرش / ملاية سرير" },
    { id: 7, name: "بطانية / لحاف" }
];

let basket = {};

// عرض القطع في الصفحة
function renderItems() {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    items.forEach(item => {
        const qty = basket[item.name] || 0;
        grid.innerHTML += `
            <div class="item-card">
                <div class="item-info">
                    <h4>${item.name}</h4>
                </div>
                <div class="item-controls">
                    <button class="btn-qty" onclick="changeQty('${item.name}', -1)">-</button>
                    <span class="qty">${qty}</span>
                    <button class="btn-qty" onclick="changeQty('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
    });
}

// تعديل الكميات
function changeQty(itemName, change) {
    if (!basket[itemName]) basket[itemName] = 0;
    basket[itemName] += change;
    if (basket[itemName] <= 0) delete basket[itemName];
    renderItems();
    updateBasketSummary();
}

// تحديث ملخص السبت
function updateBasketSummary() {
    const list = document.getElementById('basketList');
    const keys = Object.keys(basket);
    if (keys.length === 0) {
        list.innerHTML = '<li style="color: #6b7280;">السبت فارغ حالياً.. قم بإضافة الملابس من الأعلى.</li>';
        return;
    }
    list.innerHTML = '';
    keys.forEach(key => {
        list.innerHTML += `<li>• <b>${key}</b>: ${basket[key]} قطعة</li>`;
    });
}

// تجهيز وإرسال الرسالة إلى الواتساب
function sendToWhatsApp() {
    const name = document.getElementById('custName').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const time = document.getElementById('custTime').value;
    const notes = document.getElementById('custNotes').value.trim();
    const keys = Object.keys(basket);

    if (keys.length === 0) {
        alert('برجاء إضافة قطعة واحدة على الأقل في سبت الغسيل!');
        return;
    }
    if (!name || !address) {
        alert('برجاء كتابة الاسم والعنوان للتوصيل!');
        return;
    }

    let itemsText = "";
    keys.forEach(key => {
        itemsText += `  - ${key}: ${basket[key]} قطعة%0A`;
    });

    const myPhoneNumber = "201283540056"; // رقم الواتساب الخاص بك

    let message = `*طلب جديد من سبت الغسيل - مَكْوِيّ* 🧺%0A%0A`;
    message += `*تفاصيل الملابس:*%0A${itemsText}%0A`;
    message += `*بيانات العميل:*%0A`;
    message += `👤 *الاسم:* ${name}%0A`;
    message += `📍 *العنوان:* ${address}%0A`;
    message += `⏰ *الموعد المفضل:* ${time}%0A`;
    if (notes) message += `📝 *ملاحظات:* ${notes}%0A`;

    // فتح الواتساب تلقائياً
    window.open(`https://wa.me/${myPhoneNumber}?text=${message}`, '_blank');
}

// تشغيل الصفحة
renderItems();
