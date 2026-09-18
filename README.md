<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سبت الغسيل - طلّة | Talla</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; font-family: 'Tajawal', sans-serif; margin: 0; padding: 0; }
        body { background-color: #f7f9fa; color: #333; padding: 20px; direction: rtl; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px; }
        .header h1 { color: #1e3a8a; font-size: 28px; }
        .header p { color: #059669; font-weight: bold; margin-top: 5px; }
        
        .items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .item-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; background: #fafafa; }
        .item-info h4 { font-size: 16px; color: #111827; }
        .item-controls { display: flex; align-items: center; gap: 8px; }
        .btn-qty { width: 32px; height: 32px; border: none; background: #2563eb; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; }
        .btn-qty:active { transform: scale(0.95); }
        .qty { font-weight: bold; width: 20px; text-align: center; }

        .basket-summary { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 12px; margin-bottom: 25px; }
        .basket-summary h3 { color: #065f46; margin-bottom: 10px; }
        .basket-list { list-style: none; margin-bottom: 10px; font-size: 15px; }
        .basket-list li { margin-bottom: 5px; }

        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #374151; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; }
        .form-group input:focus, .form-group textarea:focus { border-color: #2563eb; }

        .btn-send { width: 100%; padding: 15px; background: #25d366; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-send:hover { background: #1ebc57; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>🧺 سبت الغسيل - طلّة | Talla</h1>
        <p>حدد ملابسك وإحنا نجيلك لحد باب البيت</p>
    </div>

    <!-- قائمة القطع -->
    <div class="items-grid" id="itemsGrid"></div>

    <!-- ملخص السبت -->
    <div class="basket-summary">
        <h3>محتويات سبت الغسيل:</h3>
        <ul class="basket-list" id="basketList">
            <li style="color: #6b7280;">السبت فارغ حالياً.. قم بإضافة الملابس من الأعلى.</li>
        </ul>
    </div>

    <!-- نموذج البيانات -->
    <div class="form-group">
        <label>الاسم بالكامل *</label>
        <input type="text" id="custName" placeholder="أدخل اسمك الكريم">
    </div>
    <div class="form-group">
        <label>العنوان بالتفصيل *</label>
        <input type="text" id="custAddress" placeholder="المنطقة، الشارع، رقم العمارة والشقة">
    </div>
    <div class="form-group">
        <label>الموعد المفضل للاستلام *</label>
        <select id="custTime">
            <option value="اليوم (مساءً من 6 إلى 10)">اليوم (مساءً من 6 إلى 10)</option>
            <option value="غداً (صباحاً من 10 إلى 2)">غداً (صباحاً من 10 إلى 2)</option>
            <option value="غداً (مساءً من 6 إلى 10)">غداً (مساءً من 6 إلى 10)</option>
        </select>
    </div>
    <div class="form-group">
        <label>ملاحظات إضافية (اختياري)</label>
        <textarea id="custNotes" rows="2" placeholder="مثال: يرجى التركيز على كي القمصان أو وجود بقعة بسيطة"></textarea>
    </div>

    <!-- زر الإرسال -->
    <button class="btn-send" onclick="sendToWhatsApp()">
        <span>إرسال الطلب عبر الواتساب</span>
    </button>
</div>

<script>
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

        let message = `*طلب جديد من مغسلة طلّة | Talla* 🧺%0A%0A`;
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
</script>

</body>
</html>
