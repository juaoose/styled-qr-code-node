import modes from '../constants/modes.js';
export default function getMode(data) {
    switch (true) {
        case /^[0-9]*$/.test(data):
            return modes.numeric;
        case /^[0-9A-Z $%*+\-./:]*$/.test(data):
            return modes.alphanumeric;
        default:
            return modes.byte;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TW9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b29scy9nZXRNb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLHVCQUF1QixDQUFDO0FBRzFDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLElBQVk7SUFDMUMsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN2QixLQUFLLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckMsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzVCO1lBQ0UsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDO0tBQ3JCO0FBQ0gsQ0FBQyJ9