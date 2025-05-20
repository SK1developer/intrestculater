

    // Get the language from the local storage or default to English
    const form = document.getElementById('calcForm');
    const output = document.getElementById('output');
    const siValue = document.getElementById('siValue');
    const ciValue = document.getElementById('ciValue');
    const totalValue = document.getElementById('totalValue');
    const resetButton = document.getElementById('resetButton');
    const toggleLangBtn = document.getElementById('toggleLang');

    // Text elements for translation
    const textElements = {
      title: document.getElementById('title'),
      labelPrincipal: document.getElementById('labelPrincipal'),
      labelRate: document.getElementById('labelRate'),
      labelRateType: document.getElementById('labelRateType'),
      labelDuration: document.getElementById('labelDuration'),
      calculateBtn: document.getElementById('calculateBtn'),
      resetButton: resetButton,
      resultsTitle: document.getElementById('resultsTitle'),
      labelSI: document.getElementById('labelSI'),
      labelCI: document.getElementById('labelCI'),
      labelTotal: document.getElementById('labelTotal'),
      toggleLangBtn: toggleLangBtn
    };

    // Dictionary for English to Hindi text
    const translations = {
      en: {
        title: 'Interest Calculator',
        labelPrincipal: 'Principal Amount (₹):',
        labelRate: 'Rate of Interest (%):',
        labelRateType: 'Rate Type:',
        labelDuration: 'Time Duration:',
        calculateBtn: 'Calculate',
        resetButton: 'Reset',
        resultsTitle: 'Results',
        labelSI: 'Simple Interest:',
        labelCI: 'Compound Interest:',
        labelTotal: 'Total Amount:',
        toggleLangBtn: 'हिन्दी',
        alerts: {
          principal: 'Please enter a valid Principal Amount.',
          rate: 'Please enter a valid Rate of Interest.',
          duration: 'Please enter time duration.',
          months: 'Months should be between 0 and 11.',
          days: 'Days should be between 0 and 30.',
        }
      },
      hi: {
        title: ' ब्याज कैलकुलेटर',
        labelPrincipal: 'मूलधन राशि (₹):',
        labelRate: 'ब्याज दर (%):',
        labelRateType: 'दर का प्रकार:',
        labelDuration: 'समय अवधि:',
        calculateBtn: 'गणना करें',
        resetButton: 'रीसेट',
        resultsTitle: 'परिणाम',
        labelSI: 'सरल ब्याज:',
        labelCI: 'चक्रवृद्धि ब्याज:',
        labelTotal: 'कुल राशि:',
        toggleLangBtn: 'English',
        alerts: {
          principal: 'कृपया मान्य मूलधन राशि दर्ज करें।',
          rate: 'कृपया मान्य ब्याज दर दर्ज करें।',
          duration: 'कृपया समय अवधि दर्ज करें।',
          months: 'महीने 0 से 11 के बीच होने चाहिए।',
          days: 'दिन 0 से 30 के बीच होने चाहिए।',
        }
      }
    };

    // Current language state
    let currentLang = 'en';

    function translateUI(lang) {
      const dict = translations[lang];
      for (const key in textElements) {
        if (textElements[key]) {
          textElements[key].textContent = dict[key];
        }
      }
    }

    // Toggle language on button click
    toggleLangBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      translateUI(currentLang);
      clearResults();
    });

    function clearResults() {
      output.classList.add('hidden');
      siValue.textContent = '';
      ciValue.textContent = '';
      totalValue.textContent = '';
    }

    resetButton.addEventListener('click', () => {
      form.reset();
      clearResults();
    });

    function validateInput(principal, rate, years, months, days) {
      const alerts = translations[currentLang].alerts;
      if (isNaN(principal) || principal <= 0) {
        alert(alerts.principal);
        return false;
      }
      if (isNaN(rate) || rate <= 0) {
        alert(alerts.rate);
        return false;
      }
      if (years === 0 && months === 0 && days === 0) {
        alert(alerts.duration);
        return false;
      }
      if (months < 0 || months > 11) {
        alert(alerts.months);
        return false;
      }
      if (days < 0 || days > 30) {
        alert(alerts.days);
        return false;
      }
      return true;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();

      let principal = parseFloat(document.getElementById('principal').value);
      let rate = parseFloat(document.getElementById('rate').value);
      const rateType = document.getElementById('rateType').value;
      let years = parseInt(document.getElementById('years').value) || 0;
      let months = parseInt(document.getElementById('months').value) || 0;
      let days = parseInt(document.getElementById('days').value) || 0;

      if (!validateInput(principal, rate, years, months, days)) return;

      // Adjust rate based on rateType
      if (rateType === 'monthly') {
        rate = rate * 12; // Convert monthly to annual for consistency
      }

      // Calculate total duration in years including months and days
      const totalYears = years + months / 12 + days / 365;

      // Simple Interest
      const simpleInterest = (principal * rate * totalYears) / 100;

      // Compound Interest (compounded monthly)
      const totalMonths = years * 12 + months + days / 30;
      const monthlyRate = rate / 12 / 100;
      const compoundAmount = principal * Math.pow(1 + monthlyRate, totalMonths);
      const compoundInterest = compoundAmount - principal;

      // Total amount for compound interest
      const totalAmount = principal + compoundInterest;

      // Show results
      siValue.textContent = simpleInterest.toFixed(2);
      ciValue.textContent = compoundInterest.toFixed(2);
      totalValue.textContent = totalAmount.toFixed(2);

      output.classList.remove('hidden');
    });

    // Initialize UI language text
    translateUI(currentLang);
  