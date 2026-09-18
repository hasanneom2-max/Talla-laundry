<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سبت الغسيل - طلّة | Talla</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; font-family: 'Tajawal', sans-serif; margin: 0; padding: 0; }
        
        body { 
            background-color: #f7f9fa; 
            color: #333; 
            padding: 20px; 
            direction: rtl;
            position: relative;
            min-height: 100vh;
        }

        /* خلفية اللوجو المائية للموقع */
        body::before {
            content: "";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 320px;
            height: 320px;
            background-image: url('https://raw.githubusercontent.com/hasanneom2-max/Talla-laundry/main/logo.png'); /* رابط اللوجو الخاص بك */
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            opacity: 0.05; /* درجة شفافية خفيفة جداً كي لا تؤثر على القراءة */
            z-index: -1;
            pointer-events: none;
        }

        .container { max-width: 800px; margin: 0 auto; background: rgba(255, 255, 255, 0.95); padding: 25px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        
        /* رأس الصفحة مع اللوجو */
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
        .header-logo { width: 90px; height: auto; margin-bottom: 10px; border-radius: 50%; }
        .header h1 { color: #1e3a8a; font-size: 26px; }
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

        /* الأزرار */
        .btn-send { width: 100%; padding: 15px; background: #25d366; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px; }
        .btn-send:hover { background: #1ebc57; }

        /* قسم الشكاوى والمقترحات */
        .complaints-section { text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px dashed #e5e7eb; }
        .btn-complaint { display: inline-block; color: #dc2626; text-decoration: none; font-weight: bold; font-size: 14px; padding: 8px 16px; border: 1px solid #fca5a5; border-radius: 8px; background-color: #fef2f2; transition: all 0.3s ease; }
        .btn-complaint:hover { background-color: #fee2e2; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <!-- اللوجو في رأس الصفحة -->
        <img src="https://raw.githubusercontent.com/hasanneom2-max/Talla-laundry/main/logo.png" alt="Talla Logo" class="header-logo" onerror="this.style.display='none'">
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

    <!-- رابط الشكاوى والمقترحات -->
    <div class="complaints-section">
        <a href="https://wa.me/201003931495?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%B7%D9%84%D9%91%D8%A9%D9%80%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%B4%D9%83%D9%88%D9%89%20%D8%A3%D9%88%20%D9%85%D9%82%D8%AA%D8%B1%D8%AD%3A" target="_blank" class="btn-complaint">
            ⚠️ للتواصل مع الإدارة مباشرة (شكاوى ومقترحات)
        </a>
    </div>
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

        const myPhoneNumber = "201283540056"; // رقم الطلبات

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
