import { inAppNotification } from "../novu/novu.js";

export const createNotif = async (req, res) => {

    const { title, body } = req.body
    // console.log(req.body)
    try {
        await inAppNotification(title, body);
        res.status(201).json({ message: 'success', title: title, body: body });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}