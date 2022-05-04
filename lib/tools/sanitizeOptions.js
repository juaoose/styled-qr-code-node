function sanitizeGradient(gradient) {
    const newGradient = { ...gradient };
    if (!newGradient.colorStops || !newGradient.colorStops.length) {
        throw "Field 'colorStops' is required in gradient";
    }
    if (newGradient.rotation) {
        newGradient.rotation = Number(newGradient.rotation);
    }
    else {
        newGradient.rotation = 0;
    }
    newGradient.colorStops = newGradient.colorStops.map((colorStop) => ({
        ...colorStop,
        offset: Number(colorStop.offset)
    }));
    return newGradient;
}
export default function sanitizeOptions(options) {
    const newOptions = { ...options };
    newOptions.width = Number(newOptions.width);
    newOptions.height = Number(newOptions.height);
    newOptions.margin = Number(newOptions.margin);
    newOptions.imageOptions = {
        ...newOptions.imageOptions,
        hideBackgroundDots: Boolean(newOptions.imageOptions.hideBackgroundDots),
        imageSize: Number(newOptions.imageOptions.imageSize),
        margin: Number(newOptions.imageOptions.margin)
    };
    if (newOptions.margin > Math.min(newOptions.width, newOptions.height)) {
        newOptions.margin = Math.min(newOptions.width, newOptions.height);
    }
    newOptions.dotsOptions = {
        ...newOptions.dotsOptions
    };
    if (newOptions.dotsOptions.gradient) {
        newOptions.dotsOptions.gradient = sanitizeGradient(newOptions.dotsOptions.gradient);
    }
    if (newOptions.cornersSquareOptions) {
        newOptions.cornersSquareOptions = {
            ...newOptions.cornersSquareOptions
        };
        if (newOptions.cornersSquareOptions.gradient) {
            newOptions.cornersSquareOptions.gradient = sanitizeGradient(newOptions.cornersSquareOptions.gradient);
        }
    }
    if (newOptions.cornersDotOptions) {
        newOptions.cornersDotOptions = {
            ...newOptions.cornersDotOptions
        };
        if (newOptions.cornersDotOptions.gradient) {
            newOptions.cornersDotOptions.gradient = sanitizeGradient(newOptions.cornersDotOptions.gradient);
        }
    }
    if (newOptions.backgroundOptions) {
        newOptions.backgroundOptions = {
            ...newOptions.backgroundOptions
        };
        if (newOptions.backgroundOptions.gradient) {
            newOptions.backgroundOptions.gradient = sanitizeGradient(newOptions.backgroundOptions.gradient);
        }
    }
    return newOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemVPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL3Nhbml0aXplT3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxTQUFTLGdCQUFnQixDQUFDLFFBQWtCO0lBQzFDLE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUVwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQzdELE1BQU0sNENBQTRDLENBQUM7S0FDcEQ7SUFFRCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDeEIsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3JEO1NBQU07UUFDTCxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUMxQjtJQUVELFdBQVcsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUE0QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JHLEdBQUcsU0FBUztRQUNaLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztLQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVKLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FBQyxPQUF3QjtJQUM5RCxNQUFNLFVBQVUsR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFFbEMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsVUFBVSxDQUFDLFlBQVksR0FBRztRQUN4QixHQUFHLFVBQVUsQ0FBQyxZQUFZO1FBQzFCLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZFLFNBQVMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDcEQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztLQUMvQyxDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckUsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25FO0lBRUQsVUFBVSxDQUFDLFdBQVcsR0FBRztRQUN2QixHQUFHLFVBQVUsQ0FBQyxXQUFXO0tBQzFCLENBQUM7SUFDRixJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQ25DLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDckY7SUFFRCxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRTtRQUNuQyxVQUFVLENBQUMsb0JBQW9CLEdBQUc7WUFDaEMsR0FBRyxVQUFVLENBQUMsb0JBQW9CO1NBQ25DLENBQUM7UUFDRixJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkc7S0FDRjtJQUVELElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFO1FBQ2hDLFVBQVUsQ0FBQyxpQkFBaUIsR0FBRztZQUM3QixHQUFHLFVBQVUsQ0FBQyxpQkFBaUI7U0FDaEMsQ0FBQztRQUNGLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtZQUN6QyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqRztLQUNGO0lBRUQsSUFBSSxVQUFVLENBQUMsaUJBQWlCLEVBQUU7UUFDaEMsVUFBVSxDQUFDLGlCQUFpQixHQUFHO1lBQzdCLEdBQUcsVUFBVSxDQUFDLGlCQUFpQjtTQUNoQyxDQUFDO1FBQ0YsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQ3pDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pHO0tBQ0Y7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIn0=