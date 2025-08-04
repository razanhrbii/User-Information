// script.js (نسخة تشخيصية آمنة)
(function () {
  "use strict";

  // فحص الاستجابات
  function ensureOk(res) {
    if (!res.ok) throw new Error(`HTTP ${res.status} @ ${res.url}`);
    return res;
  }

  // تحميل الجدول
  function loadTable() {
    console.log("[JS] Loading table from list.php...");
    fetch("./list.php", { cache: "no-store" })
      .then(ensureOk)
      .then(r => r.text())
      .then(html => {
        const box = document.getElementById("userTable");
        if (!box) {
          console.warn('[JS] لم أجد <div id="userTable"> في الصفحة.');
          return;
        }
        box.innerHTML = html;
        console.log("[JS] Table loaded.");
      })
      .catch(err => {
        console.error("[JS] list.php fetch error:", err);
        const box = document.getElementById("userTable");
        if (box) box.innerHTML = <div style="color:#b00;">Failed to load table: ${err}</div>;
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.log("[JS] DOM ready.");

    // حمّل الجدول عند الفتح
    loadTable();

    // معالجة إرسال الفورم (إن وُجد)
    const form = document.getElementById("userForm") ||
                 document.querySelector('form[action="submit.php"]');
    if (!form) {
      console.warn('[JS] لم أجد الفورم. تأكد من وجود <form id="userForm"> أو action="submit.php".');
    } else {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const btn = form.querySelector('[type="submit"]');
        if (btn) btn.disabled = true;

        console.log("[JS] Sending form to submit.php...");
        fetch("./submit.php", { method: "POST", body: formData })
          .then(ensureOk)
          .then(r => r.text())
          .then(txt => {
            console.log("[JS] submit.php response:", txt);
            form.reset();
            loadTable(); // حدث الجدول بعد الإضافة
          })
          .catch(err => {
            console.error("[JS] submit.php error:", err);
            alert("حدث خطأ أثناء الإرسال. راجعي Console للتفاصيل.");
          })
          .finally(() => { if (btn) btn.disabled = false; });
      });
    }

    // تفويض أحداث لزر التبديل داخل الجدول
    const box = document.getElementById("userTable");
    if (!box) {
      console.warn('[JS] userTable container غير موجود الآن (سيظهر التحذير فقط إن لم يكن في HTML).');
    } else {
      box.addEventListener("click", (e) => {
        const btn = e.target.closest(".toggle-btn");
        if (!btn) return; // ضغط على شيء آخر
        const id = btn.dataset.id;
        if (!id) {
          console.warn("[JS] زر toggle بدون data-id.");
          return;
        }

        console.log(`[JS] Toggling status for id=${id}`);
        fetch("./toggle.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: id=${encodeURIComponent(id)}
        })
          .then(ensureOk)
          .then(r => r.text())
          .then(newStatus => {
            console.log("[JS] toggle.php response:", newStatus);
            const cell = document.getElementById(`status-${id}`);
            if (cell) cell.textContent = newStatus;
            else loadTable(); // احتياط
          })
          .catch(err => console.error("[JS] toggle.php error:", err));
      });
    }
  });
})();