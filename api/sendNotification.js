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

function saveSubscriptions(subscriptions) {
    try {
        fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to subscriptions file:', error);
    }
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const subscription = req.body;
        let subscriptions = loadSubscriptions();
        
        const isSubscribed = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
        if (!isSubscribed) {
            subscriptions.push(subscription);
            saveSubscriptions(subscriptions);
        }
        
        res.status(201).json({ message: 'Subscription added successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
