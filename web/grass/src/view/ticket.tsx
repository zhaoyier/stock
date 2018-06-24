import renderAppEntry from "../util/renderAppEntry";
import Ticket from "../component/Ticket";

renderAppEntry(Ticket);

if (module.hot) {
	module.hot.accept("../component/Ticket", () => {
		renderAppEntry(Ticket);
	});
}
