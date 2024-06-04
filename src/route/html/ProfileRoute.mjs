import { ReplyType, Route } from '../../Route.mjs';
import { Session } from '../../Session.mjs';
import PaymentModel from '../../model/PaymentModel.mjs';
import TicketModel from '../../model/TicketModel.mjs';
import UserModel from '../../model/UserModel.mjs';

const ProfileRoute = new Route(
    'GET', '/profile', ReplyType.HTML,
    async (req, res) => {
        const Payments = PaymentModel.use();
        const Ticket = TicketModel.use();
        const User = UserModel.use();

        try {
            const sessionCookie = req.unsignCookie(req.cookies.currentSession);
            const session = Session.fromCookie(sessionCookie);
            console.log('session ' + session.token);

            const user = await User.findOne(session.byRef());
            const userId = user.id;

            const payments = await Payments.findAll({
                where: {
                    userId: userId,
                },
            });

            const tickets = await Ticket.findAll({
                where: {
                    userId: userId,
                },
                include: ['payment'],
            });

            const paymentData = payments.map(payment => payment.get());

            return res.viewAsync('profile.hbs', {
                helloName: user.login,
                unpaidPayments: paymentData.filter(pay => !pay.isPaid),
                paidPayments: paymentData.filter(pay => pay.isPaid),
                tickets: tickets.filter(ticket => ticket.payment.isPaid).map(ticket => ticket.get()),
            });
        }
        catch (e) {
            console.error(e);
            res.redirect('/login');
            return '';
        }
    },
);

export default ProfileRoute;
