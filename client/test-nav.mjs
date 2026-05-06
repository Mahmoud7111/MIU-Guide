import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE LOG ERROR:', msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });

  console.log('Navigating to login page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
  
  console.log('Waiting for login form...');
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });

  console.log('Logging in...');
  await page.type('input[type="email"]', 'student@miuegypt.edu.eg');
  await page.type('input[type="password"]', '12345678');
  await page.click('button[type="submit"]');

  console.log('Waiting for dashboard...');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  let url = page.url();
  console.log('Current URL:', url);
  
  let heading = await page.$eval('h1', el => el.textContent).catch(() => 'no h1');
  console.log('Dashboard Heading:', heading);

  // Evaluate and click GPA Calculator link
  console.log('Clicking GPA Calculator...');
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const gpaLink = links.find(el => el.textContent.includes('GPA Calculator'));
    if (gpaLink) gpaLink.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  console.log('After clicking GPA, URL:', page.url());
  heading = await page.$eval('h1', el => el.textContent).catch(() => 'no h1');
  console.log('GPA Heading:', heading);

  // Evaluate and click Attendance link
  console.log('Clicking Attendance...');
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const link = links.find(el => el.textContent.includes('Attendance'));
    if (link) link.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  console.log('After clicking Attendance, URL:', page.url());
  heading = await page.$eval('h1', el => el.textContent).catch(() => 'no h1');
  console.log('Attendance Heading:', heading);

  await browser.close();
})();
