export function getMessageCount(count: number): "99+" | number {
	return count > 99 ? "99+" : count;
}