export default function calculateImageSize({ originalHeight, originalWidth, maxHiddenDots, maxHiddenAxisDots, dotSize }) {
    const hideDots = { x: 0, y: 0 };
    const imageSize = { x: 0, y: 0 };
    if (originalHeight <= 0 || originalWidth <= 0 || maxHiddenDots <= 0 || dotSize <= 0) {
        return {
            height: 0,
            width: 0,
            hideYDots: 0,
            hideXDots: 0
        };
    }
    const k = originalHeight / originalWidth;
    //Getting the maximum possible axis hidden dots
    hideDots.x = Math.floor(Math.sqrt(maxHiddenDots / k));
    //The count of hidden dot's can't be less than 1
    if (hideDots.x <= 0)
        hideDots.x = 1;
    //Check the limit of the maximum allowed axis hidden dots
    if (maxHiddenAxisDots && maxHiddenAxisDots < hideDots.x)
        hideDots.x = maxHiddenAxisDots;
    //The count of dots should be odd
    if (hideDots.x % 2 === 0)
        hideDots.x--;
    imageSize.x = hideDots.x * dotSize;
    //Calculate opposite axis hidden dots based on axis value.
    //The value will be odd.
    //We use ceil to prevent dots covering by the image.
    hideDots.y = 1 + 2 * Math.ceil((hideDots.x * k - 1) / 2);
    imageSize.y = Math.round(imageSize.x * k);
    //If the result dots count is bigger than max - then decrease size and calculate again
    if (hideDots.y * hideDots.x > maxHiddenDots || (maxHiddenAxisDots && maxHiddenAxisDots < hideDots.y)) {
        if (maxHiddenAxisDots && maxHiddenAxisDots < hideDots.y) {
            hideDots.y = maxHiddenAxisDots;
            if (hideDots.y % 2 === 0)
                hideDots.x--;
        }
        else {
            hideDots.y -= 2;
        }
        imageSize.y = hideDots.y * dotSize;
        hideDots.x = 1 + 2 * Math.ceil((hideDots.y / k - 1) / 2);
        imageSize.x = Math.round(imageSize.y / k);
    }
    return {
        height: imageSize.y,
        width: imageSize.x,
        hideYDots: hideDots.y,
        hideXDots: hideDots.x
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlSW1hZ2VTaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL2NhbGN1bGF0ZUltYWdlU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQSxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUFDLEVBQ3pDLGNBQWMsRUFDZCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixPQUFPLEVBQ1U7SUFDakIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBRWpDLElBQUksY0FBYyxJQUFJLENBQUMsSUFBSSxhQUFhLElBQUksQ0FBQyxJQUFJLGFBQWEsSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtRQUNuRixPQUFPO1lBQ0wsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLFNBQVMsRUFBRSxDQUFDO1lBQ1osU0FBUyxFQUFFLENBQUM7U0FDYixDQUFDO0tBQ0g7SUFFRCxNQUFNLENBQUMsR0FBRyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRXpDLCtDQUErQztJQUMvQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxnREFBZ0Q7SUFDaEQsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyx5REFBeUQ7SUFDekQsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUM7SUFDeEYsaUNBQWlDO0lBQ2pDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN2QyxTQUFTLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ25DLDBEQUEwRDtJQUMxRCx3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekQsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsc0ZBQXNGO0lBQ3RGLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNwRyxJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUU7WUFDdkQsUUFBUSxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztZQUMvQixJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3hDO2FBQU07WUFDTCxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELFNBQVMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU87UUFDTCxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xCLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQixTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDdEIsQ0FBQztBQUNKLENBQUMifQ==