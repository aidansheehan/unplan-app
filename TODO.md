### TODO MVP

[x] Ensure lesson plan displayed nicely and PRINTS well
[x] Generate mats
[x] Init firebase project with firebase storage
    [x] Save lesson plans to server on generation
    [x] Navigate to page for this lesson so at least links to lessons are sharable and reloadable
        [x] Find lesson by ID in db, retrieve handout and plan markdown, display
            [ ] Fix crazy long page load times

[ ] Implement a LESSON LIBRARY
    [ ] Lessons displayed in lesson library if 'public' true on lesson (This'll be something you do manually, auditing lessons by loading up page with lesson ID)
    [ ] Group by beginner, intermediate, advanced
    [ ] Let's use a basic carousel for now

[ ] Implement basic site navigation

[ ] Implement a really basic terms of use page

[ ] Improve landing page

### Extra
[ ] Search box in lesson library
[ ] Implement star rating for lesson plans, save ratings to server too
[ ] Implement a dialog to request a second lesson plan - user can write their probs with lesson plan 1, generate a second, then choose which of the two plans to proceed with (for mats generation)