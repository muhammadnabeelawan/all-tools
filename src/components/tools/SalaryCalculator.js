'use client';
import { useState } from 'react';

export default function SalaryCalculator() {
    const [salary, setSalary] = useState(60000);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const [currency, setCurrency] = useState('$');
    const [taxRate, setTaxRate] = useState(20);

    const total = parseFloat(salary) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const tax = total * (taxRate / 100);
    const netTotal = total - tax;

    const stats = [
        { label: 'Yearly Gross', value: total },
        { label: 'Yearly Net', value: netTotal, color: 'var(--accent-success)' },
        { label: 'Monthly Net', value: netTotal / 12 },
        { label: 'Weekly Net', value: netTotal / weeks },
        { label: 'Daily Net', value: (netTotal / weeks) / 5 },
        { label: 'Hourly Net', value: netTotal / (weeks * hours) },
    ];

    const currencies = [
        { label: 'USD - US Dollar ($)', symbol: '$' },
        { label: 'EUR - Euro (€)', symbol: '€' },
        { label: 'GBP - British Pound (£)', symbol: '£' },
        { label: 'INR - Indian Rupee (₹)', symbol: '₹' },
        { label: 'JPY - Japanese Yen (¥)', symbol: '¥' },
        { label: 'CNY - Chinese Yuan (¥)', symbol: '¥' },
        { label: 'AUD - Australian Dollar ($)', symbol: 'A$' },
        { label: 'CAD - Canadian Dollar ($)', symbol: 'C$' },
        { label: 'CHF - Swiss Franc (Fr)', symbol: 'Fr' },
        { label: 'HKD - Hong Kong Dollar ($)', symbol: 'HK$' },
        { label: 'SGD - Singapore Dollar ($)', symbol: 'S$' },
        { label: 'AED - United Arab Emirates Dirham (د.إ)', symbol: 'د.إ' },
        { label: 'AFN - Afghan Afghani (؋)', symbol: '؋' },
        { label: 'ALL - Albanian Lek (L)', symbol: 'L' },
        { label: 'AMD - Armenian Dram (֏)', symbol: '֏' },
        { label: 'ANG - Netherlands Antillean Guilder (ƒ)', symbol: 'ƒ' },
        { label: 'AOA - Angolan Kwanza (Kz)', symbol: 'Kz' },
        { label: 'ARS - Argentine Peso ($)', symbol: 'AR$' },
        { label: 'AWG - Aruban Florin (ƒ)', symbol: 'ƒ' },
        { label: 'AZN - Azerbaijani Manat (₼)', symbol: '₼' },
        { label: 'BAM - Bosnia-Herzegovina Convertible Mark (KM)', symbol: 'KM' },
        { label: 'BBD - Barbadian Dollar ($)', symbol: 'Bds$' },
        { label: 'BDT - Bangladeshi Taka (৳)', symbol: '৳' },
        { label: 'BGN - Bulgarian Lev (лв)', symbol: 'лв' },
        { label: 'BHD - Bahraini Dinar (.د.ب)', symbol: '.د.ب' },
        { label: 'BIF - Burundian Franc (FBu)', symbol: 'FBu' },
        { label: 'BMD - Bermudan Dollar ($)', symbol: 'BD$' },
        { label: 'BND - Brunei Dollar ($)', symbol: 'B$' },
        { label: 'BOB - Bolivian Boliviano (Bs.)', symbol: 'Bs.' },
        { label: 'BRL - Brazilian Real (R$)', symbol: 'R$' },
        { label: 'BSD - Bahamian Dollar ($)', symbol: 'B$' },
        { label: 'BTN - Bhutanese Ngultrum (Nu.)', symbol: 'Nu.' },
        { label: 'BWP - Botswanan Pula (P)', symbol: 'P' },
        { label: 'BYN - Belarusian Ruble (Br)', symbol: 'Br' },
        { label: 'BZD - Belize Dollar ($)', symbol: 'BZ$' },
        { label: 'CDF - Congolese Franc (FC)', symbol: 'FC' },
        { label: 'CLP - Chilean Peso ($)', symbol: 'CL$' },
        { label: 'COP - Colombian Peso ($)', symbol: 'COL$' },
        { label: 'CRC - Costa Rican Colón (₡)', symbol: '₡' },
        { label: 'CUP - Cuban Peso ($)', symbol: '$' },
        { label: 'CVE - Cape Verdean Escudo ($)', symbol: '$' },
        { label: 'CZK - Czech Koruna (Kč)', symbol: 'Kč' },
        { label: 'DJF - Djiboutian Franc (Fdj)', symbol: 'Fdj' },
        { label: 'DKK - Danish Krone (kr)', symbol: 'kr' },
        { label: 'DOP - Dominican Peso ($)', symbol: 'RD$' },
        { label: 'DZD - Algerian Dinar (د.ج)', symbol: 'د.ج' },
        { label: 'EGP - Egyptian Pound (E£)', symbol: 'E£' },
        { label: 'ERN - Eritrean Nakfa (Nfk)', symbol: 'Nfk' },
        { label: 'ETB - Ethiopian Birr (Br)', symbol: 'Br' },
        { label: 'FJD - Fijian Dollar ($)', symbol: 'FJ$' },
        { label: 'FKP - Falkland Islands Pound (£)', symbol: '£' },
        { label: 'GEL - Georgian Lari (₾)', symbol: '₾' },
        { label: 'GHS - Ghanaian Cedi (₵)', symbol: '₵' },
        { label: 'GIP - Gibraltar Pound (£)', symbol: '£' },
        { label: 'GMD - Gambian Dalasi (D)', symbol: 'D' },
        { label: 'GNF - Guinean Franc (FG)', symbol: 'FG' },
        { label: 'GTQ - Guatemalan Quetzal (Q)', symbol: 'Q' },
        { label: 'GYD - Guyanaese Dollar ($)', symbol: 'G$' },
        { label: 'HNL - Honduran Lempira (L)', symbol: 'L' },
        { label: 'HRK - Croatian Kuna (kn)', symbol: 'kn' },
        { label: 'HTG - Haitian Gourde (G)', symbol: 'G' },
        { label: 'HUF - Hungarian Forint (Ft)', symbol: 'Ft' },
        { label: 'IDR - Indonesian Rupiah (Rp)', symbol: 'Rp' },
        { label: 'ILS - Israeli New Shekel (₪)', symbol: '₪' },
        { label: 'IQD - Iraqi Dinar (د.ع)', symbol: 'د.ع' },
        { label: 'IRR - Iranian Rial (﷼)', symbol: '﷼' },
        { label: 'ISK - Icelandic Króna (kr)', symbol: 'kr' },
        { label: 'JMD - Jamaican Dollar ($)', symbol: 'J$' },
        { label: 'JOD - Jordanian Dinar (د.ا)', symbol: 'د.ا' },
        { label: 'KES - Kenyan Shilling (KSh)', symbol: 'KSh' },
        { label: 'KGS - Kyrgystani Som (с)', symbol: 'с' },
        { label: 'KHR - Cambodian Riel (៛)', symbol: '៛' },
        { label: 'KMF - Comorian Franc (CF)', symbol: 'CF' },
        { label: 'KPW - North Korean Won (₩)', symbol: '₩' },
        { label: 'KRW - South Korean Won (₩)', symbol: '₩' },
        { label: 'KWD - Kuwaiti Dinar (د.ك)', symbol: 'د.ك' },
        { label: 'KYD - Cayman Islands Dollar ($)', symbol: 'CI$' },
        { label: 'KZT - Kazakhstani Tenge (₸)', symbol: '₸' },
        { label: 'LAK - Laotian Kip (₭)', symbol: '₭' },
        { label: 'LBP - Lebanese Pound (L£)', symbol: 'L£' },
        { label: 'LKR - Sri Lankan Rupee (Rs)', symbol: 'Rs' },
        { label: 'LRD - Liberian Dollar ($)', symbol: 'L$' },
        { label: 'LSL - Lesotho Loti (L)', symbol: 'L' },
        { label: 'LYD - Libyan Dinar (د.ل)', symbol: 'د.ل' },
        { label: 'MAD - Moroccan Dirham (د.م.)', symbol: 'د.م.' },
        { label: 'MDL - Moldovan Leu (L)', symbol: 'L' },
        { label: 'MGA - Malagasy Ariary (Ar)', symbol: 'Ar' },
        { label: 'MKD - Macedonian Denar (ден)', symbol: 'ден' },
        { label: 'MMK - Myanmar Kyat (K)', symbol: 'K' },
        { label: 'MNT - Mongolian Tugrik (₮)', symbol: '₮' },
        { label: 'MOP - Macanese Pataca (P)', symbol: 'P' },
        { label: 'MRU - Mauritanian Ouguiya (UM)', symbol: 'UM' },
        { label: 'MUR - Mauritian Rupee (Rs)', symbol: 'Rs' },
        { label: 'MVR - Maldivian Rufiyaa (Rf)', symbol: 'Rf' },
        { label: 'MWK - Malawian Kwacha (MK)', symbol: 'MK' },
        { label: 'MXN - Mexican Peso ($)', symbol: 'Mex$' },
        { label: 'MYR - Malaysian Ringgit (RM)', symbol: 'RM' },
        { label: 'MZN - Mozambican Metical (MT)', symbol: 'MT' },
        { label: 'NAD - Namibian Dollar ($)', symbol: 'N$' },
        { label: 'NGN - Nigerian Naira (₦)', symbol: '₦' },
        { label: 'NIO - Nicaraguan Córdoba (C$)', symbol: 'C$' },
        { label: 'NOK - Norwegian Krone (kr)', symbol: 'kr' },
        { label: 'NPR - Nepalese Rupee (Rs)', symbol: 'Rs' },
        { label: 'NZD - New Zealand Dollar ($)', symbol: 'NZ$' },
        { label: 'OMR - Omani Rial (ر.ع.)', symbol: 'ر.ع.' },
        { label: 'PAB - Panamanian Balboa (B/.)', symbol: 'B/.' },
        { label: 'PEN - Peruvian Sol (S/.)', symbol: 'S/.' },
        { label: 'PGK - Papua New Guinean Kina (K)', symbol: 'K' },
        { label: 'PHP - Philippine Peso (₱)', symbol: '₱' },
        { label: 'PKR - Pakistani Rupee (Rs)', symbol: 'Rs' },
        { label: 'PLN - Polish Zloty (zł)', symbol: 'zł' },
        { label: 'PYG - Paraguayan Guarani (₲)', symbol: '₲' },
        { label: 'QAR - Qatari Rial (ر.ق)', symbol: 'ر.ق' },
        { label: 'RON - Romanian Leu (lei)', symbol: 'lei' },
        { label: 'RSD - Serbian Dinar (din)', symbol: 'din' },
        { label: 'RUB - Russian Ruble (₽)', symbol: '₽' },
        { label: 'RWF - Rwandan Franc (FRw)', symbol: 'FRw' },
        { label: 'SAR - Saudi Riyal (ر.س)', symbol: 'ر.س' },
        { label: 'SBD - Solomon Islands Dollar ($)', symbol: 'SI$' },
        { label: 'SCR - Seychellois Rupee (Rs)', symbol: 'Rs' },
        { label: 'SDG - Sudanese Pound (S£)', symbol: 'S£' },
        { label: 'SEK - Swedish Krona (kr)', symbol: 'kr' },
        { label: 'SHP - St. Helena Pound (£)', symbol: '£' },
        { label: 'SLL - Sierra Leonean Leone (Le)', symbol: 'Le' },
        { label: 'SOS - Somali Shilling (Sh)', symbol: 'Sh' },
        { label: 'SRD - Surinamese Dollar ($)', symbol: 'Sur$' },
        { label: 'SSP - South Sudanese Pound (S£)', symbol: 'S£' },
        { label: 'STN - São Tomé & Príncipe Dobra (Db)', symbol: 'Db' },
        { label: 'SYP - Syrian Pound (LS)', symbol: 'LS' },
        { label: 'SZL - Swazi Lilangeni (L)', symbol: 'L' },
        { label: 'THB - Thai Baht (฿)', symbol: '฿' },
        { label: 'TJS - Tajikistani Somoni (ЅМ)', symbol: 'ЅМ' },
        { label: 'TMT - Turkmenistani Manat (m)', symbol: 'm' },
        { label: 'TND - Tunisian Dinar (د.ت)', symbol: 'د.ت' },
        { label: 'TOP - Tongan Paʻanga (T$)', symbol: 'T$' },
        { label: 'TRY - Turkish Lira (₺)', symbol: '₺' },
        { label: 'TTD - Trinidad & Tobago Dollar ($)', symbol: 'TT$' },
        { label: 'TWD - New Taiwan Dollar ($)', symbol: 'NT$' },
        { label: 'TZS - Tanzanian Shilling (TSh)', symbol: 'TSh' },
        { label: 'UAH - Ukrainian Hryvnia (₴)', symbol: '₴' },
        { label: 'UGX - Ugandan Shilling (USh)', symbol: 'USh' },
        { label: 'UYU - Uruguayan Peso ($)', symbol: '$U' },
        { label: 'UZS - Uzbekistani Som (с)', symbol: 'с' },
        { label: 'VES - Venezuelan Bolívar (Bs.S)', symbol: 'Bs.S' },
        { label: 'VND - Vietnamese Dong (₫)', symbol: '₫' },
        { label: 'VUV - Vanuatu Vatu (VT)', symbol: 'VT' },
        { label: 'WST - Samoan Tala (WS$)', symbol: 'WS$' },
        { label: 'XAF - Central African CFA Franc (FCFA)', symbol: 'FCFA' },
        { label: 'XCD - East Caribbean Dollar ($)', symbol: 'EC$' },
        { label: 'XOF - West African CFA Franc (CFA)', symbol: 'CFA' },
        { label: 'XPF - CFP Franc (CFP)', symbol: 'CFP' },
        { label: 'YER - Yemeni Rial (﷼)', symbol: '﷼' },
        { label: 'ZAR - South African Rand (R)', symbol: 'R' },
        { label: 'ZMW - Zambian Kwacha (ZK)', symbol: 'ZK' },
        { label: 'ZWL - Zimbabwean Dollar ($)', symbol: 'Z$' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Currency</label>
                    <select className="input-field" value={currency} onChange={e => setCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c.label} value={c.symbol}>{c.label}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>Estimated Tax Rate (%)</label>
                    <input className="input-field" type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Gross Yearly Salary ({currency})</label>
                    <input className="input-field" type="number" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Hours Per Week</label>
                    <input className="input-field" type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Weeks Per Year</label>
                    <input className="input-field" type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
                {stats.map(s => (
                    <div key={s.label} className="metric-card" style={{
                        borderColor: s.label.includes('Gross') ? 'var(--accent-primary)' : (s.label.includes('Net') ? 'var(--accent-success)' : 'var(--border-color)'),
                        background: s.label.includes('Yearly') ? 'rgba(139, 92, 246, 0.05)' : 'transparent'
                    }}>
                        <div className="metric-label">{s.label}</div>
                        <div className="metric-value" style={{ color: s.color }}>
                            {currency}{s.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <p>💡 This calculator provides gross estimates before taxes and deductions. Calculations are based on {weeks} working weeks per year and a standard 5-day work week for the daily rate.</p>
            </div>
        </div>
    );
}
