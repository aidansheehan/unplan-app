### TODO MVP

[x] Ensure lesson plan displayed nicely and PRINTS well
[x] Generate mats
[x] Init firebase project with firebase storage
    [x] Save lesson plans to server on generation
    [x] Navigate to page for this lesson so at least links to lessons are sharable and reloadable
        [x] Find lesson by ID in db, retrieve handout and plan markdown, display
            [x] Fix crazy long page load times
                [x] Implement placeholder content for LP + Handouts, disable print btn while loading

[ ] Implement a LESSON LIBRARY
    [x] Lessons displayed in lesson library, click to link to lessons
    [ ] Implement search bar

[ ] Implement basic site navigation
    [ ] Could you include a link to 'your last lesson' - lessonId stored in local storage?

[ ] Implement a really basic terms of use page

[ ] Improve landing page

[ ] Improve loading page as is quite a long load time (after generate lesson - give a message, whatever)

### Extra
[ ] Search box in lesson library
[ ] Implement star rating for lesson plans, save ratings to server too
[ ] Implement a dialog to request a second lesson plan - user can write their probs with lesson plan 1, generate a second, then choose which of the two plans to proceed with (for mats generation)