### Clean up Editable Content
    [ ] Block edits to public lessons on backend in cloud fn
    [ ] Save initial draft to storage too so can compare (plan.html, plan-initial.html), add legal disclamier you own content you create.
    [ ] Add warning / instruction to add content like images etc
    [ ] Fix no option to save on mobile

### image-handling
    Can you just use an on-page public API, eg unsplash?
    You could replace any image in worksheet with a button 'Choose image...' which brings up a modal allowing users to search images. You could pre-fill the search box with the alt tag.
    You could dynamically resize all images to a helpful (smallish) size - teacher can resize as they like
    You could block 'print' until all images have been inserted (or at least be like 'You haven't added images. Print anyway...', maybe less error prone)
    Or, You could simplify and just add it as a seperate component for now

### loading-ux
    [x] Properly sandboxed emulator dev environment
        [x] Lesson plans
        [x] activities
    [ ] lesson plan generation to lesson plan page
        [x] Plan page simply create document then re-direct
        [x] write lesson plan on firestore doc update
        [x] frontend needs to listen for changes (ws?) and update accordingly (show loading state then lesson plan)
        [ ] Handle error ('failed' state) with re-generate button?
        [x] apply rate limiter to adding docs to the firestore instance since can't now on generateLessonPlan
        [x] ensure not triggering openai responses on update docs! (only create)
    [x] use websocket from browser to generate completion, save to firebase DB after completion finished OR investigate google pub-sub
        [x] Prevent abuse ie keep reloading keep re-generating. 
    [x] Reduce writes by sending each time threshold number of chunks reached
    [x] fix 2 min loader on activities -> 20 secs (revert full page loader to original)

### auth
    [x] Login
        [x] Form
            [x] Autocomplete
        [x] Functionality
    [x] Signup form
        [x] Form
            [x] Autocomplete
        [x] Functionality
        [x] Login on successful signup
    [ ] Persist user sessions
    [x] avoid FOUC
    [x] Logout
    [ ] Google
        [x] Use google brand guidelines
        [x] Implement 'Continue with Google'
        [ ] Handle mailing list?
    [ ] Error handling
        [ ] Already have account
        [ ] Issue creating account
        [ ] Issue logging in
            [ ] Wrong PW
            [ ] Wrong email
            [ ] Server side (sth went wrong)?
    [ ] Form (password, maybe email?) should validate according to firebase password rules
    [ ] 'Edge' cases?
        [ ] Forgot / Reset password
        [ ] Confirm email?
        [ ] Contact (acc deletion, whatever else, just multi purpose contact us we'll help form)
    [ ] Authenticated usage of app
        [ ] Protected routes (create LP, CR Activities, Your Lessons, Home)
        [ ] Lesson plans saved & accessed by user
        [ ] Activities saved & accessed by user
        [ ] Conditionally render navigation
    [ ] Test live

### PUBILCITY (maybe all as 1 branch)
[ ] P1: Implement SEO practices following guides to improve search engine rankings
[ ] P1: Implement meta tags required for facebook without warnings
[ ] P1: Create a facebook page, add an initial post and basic content, then you can post there as you grow?
[ ] P2: Add CTA to give feedback to bottom of activity / lesson plan view. also link back to 'activities' for activity and 'my lessons' for lessons. Maybe 'your lessons' should be called 'my lessons'?

### CORE PRODUCT (seperate branches)
[ ] Identify and implement new DB structure to allow proposed growth ideas
    [ ] Timestamp lessons

[ ] Handle image generation 
[ ] Add EDIT btn with WYSIWYG editor P1?
[ ] Seperate lesson plan & handouts generation (checkbox 'generate handout activities' so users can decide if they want them or not? + 'Generate materials for this lesson' on other page to improve load times & decrease API costs)4
[ ] Plans & Activities not level / age appropriate particularly at the bottom end, too vague - NEED TO PROVIDE EXAMPLES OF GODO CONTENT AND FINE-TUNE GPT MODEL FOR THIS, can also start with split on beginner / int / advanced different prompts, could experiment with feeding like 'plan a free practice' then feed free practice and metadata, 'plan a controlled practice' - plan the lesson in an order that makes sense, feeding it it's generated content each time

## Feedback
[x] Remove kindy
    [x] From form
    [x] From library
[ ] Add class profile to initial form (can your students write? can your students read?) - AI will generate appropriate activities and exclude innapropriate activities for that particular class
[ ] Make localStorage limitations clear to users
[ ] Radio button to select generate handout -> button to generate handout
[ ] ... pictures, visual stories
[ ] ... Shared library of content with votes
[ ] ... More specificity for ouput generation
[ ] ... Improve design
[x] Radio btn for online teachers (maybe also group class vs 1-on-1), reply to redit u/AdrianAlucardTepes once implemented P1 IFF
[x] CEFR levels P1 IFF

## TODO
[ ] Improve load screen - can handle lesson plan + mats seperately, then display a green lesson plan created! generating materials ... for user experience of PROGRESS. Maybe also implement a TIMEOUT and display error screen if it takes like a minute?
[ ] Investigate improve markdown file load times?
[ ] Use CORS to prevent requests from other origins
[ ] Investigate using an iframe for better text-content-presentation-component display (closer to what will be printed) - can you make it a4 size? OR should you leave the /n in table as they seem to work well with the gram / vocab worksheet
[ ] Refactor shitty my activities logic and components, generic with lesson lib logic
[ ] Remove title from layout and create <TitleComponent>, standardize appearance across app
[ ] Put style tag on html for line heights so lines for students to write on look ok (see activity id rsilJnb1l3DM9jSgBPRo)
[ ] HTML output raw on find sb who - 1 time, iphone? https://www.easyplanesl.com/activity/1Xpt55Sq9H1ffyn7FP0k

[x] fix activities page loader flush with top component no padding P1 IFF
[x] Add Web Analytics (Vercel) https://vercel.com/aidansheehan/lesson-planner/analytics?environment=all P1 IFF


## BACKLOG
[ ] Implement star rating for lesson plans, save ratings to server too
[ ] Implement a dialog to request a second lesson plan - user can write their probs with lesson plan 1, generate a second, then choose which of the two plans to proceed with (for mats generation)
[ ] Revisit newsletter already subscribbed code 400 hack
[ ] Animate header menu (mobile)
[ ] Animate open lesson plan / open mats
[ ] Investigate better handling of raw HTML - can you process as close as possible to PDF?