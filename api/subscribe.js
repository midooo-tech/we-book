const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

const publicVapidKey = "BE4LLxozZ2s94SOfmtLy5zCBd9H3Ll1TaBNlNY5d8OjnErQQ7PNBPj2BsTLSOoHCDigVBXMJpEU96iTz33UyZ_E";
const privateVapidKey = "pUm99PHZzkqyw0Xi0br0kQRLqngHMEWHdpY8FLQ5Zq8";
webpush.setVapidDetails('mailto:mamdou7.khalaf@gmail.com', publicVapidKey, privateVapidKey);

const subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');

function loadSubscriptions() {
    try {
        const data = fs.readFileSync(subscriptionsFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading subscriptions file:', error);
        return [];
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { title, body, url } = req.body;
        const payload = JSON.stringify({
            title: title || 'WE Book',
            body: body || 'Have a good day!',
            url: url || 'https://www.te.eg/',
        });
        
        const subscriptions = loadSubscriptions();
        subscriptions.forEach(subscription => {
            webpush.sendNotification(subscription, payload).catch(error => {
                console.error('Error sending notification:', error);
            });
        });

        res.status(200).json({ message: 'Notifications sent successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
