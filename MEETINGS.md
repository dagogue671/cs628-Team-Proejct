# MEETINGS.md

**Course:** CS628 · Full-Stack Web Development — Team Project
**Team members:** David Gogue, Eric Hall, Lanxi Luo
**Repository:** `cs628-Team-Proejct`
**Standing meeting:** Saturdays at 8:00 PM (Microsoft Teams), plus asynchronous
coordination through the Teams group chat and GitHub throughout the week.

> Teammates: please review your own task section and the meeting focus notes for
> accuracy, and adjust any dates or details that differ from what actually happened.

---

## Weekly Meetings

| Date          | Attendees          | Focus                                                               |
| ------------- | ------------------ | ------------------------------------------------------------------- |
| Jul 11, 2026  | David, Eric, Lanxi | Kickoff · chose the social-platform topic and agreed on MVP scope   |
| Jul 18, 2026  | David, Eric, Lanxi | Architecture and MERN stack · Learning Team Charter · TP01 proposal |
| Jul 25, 2026  | David, Eric, Lanxi | Backend data models and REST API design · feature ownership         |
| Aug 01, 2026  | David, Eric, Lanxi | Authentication and posts implementation · frontend components       |
| Aug 08, 2026  | David, Eric, Lanxi | Feed, likes, comments, and friends · frontend/backend integration   |
| Aug 15, 2026  | David, Eric, Lanxi | TP02 progress report · wiring the frontend to the API               |
| Aug 22, 2026  | David, Eric, Lanxi | TP03 paper draft · testing and bug fixes                            |
| Aug 29, 2026  | David, Eric, Lanxi | Finalized features · report editing and APA references              |
| Sep 05, 2026  | David, Eric, Lanxi | TP04 presentation · slides and narration                            |
| Sep 12, 2026  | David, Eric, Lanxi | Final review · demo and submission                                  |

Assignment leadership rotated by milestone: David → Eric → Lanxi.

---

## Individual Tasks

_Per the assignment, each member describes their own tasks._

### David Gogue
- Set up the GitHub repository, the Docker Compose environment, and the base MERN
  template for the team to build on.
- Built the landing page and the sign-in / sign-up forms.
- Implemented the backend authentication routes — bcrypt password hashing on
  registration and credential verification on login — and the User model.
- Owner of the **authentication and user-profile** feature.

### Eric Hall
- Built the home page, the post-feed interface, and the settings page with a
  light / dark theme toggle.
- Implemented post creation and retrieval with MongoDB persistence (the posts route
  and Post model).
- Recorded the narrated audio for the project presentation.
- Owner of the **posts** feature.

### Lanxi Luo
- Implemented the **like** and **comment** features on the feed, wired to the
  Express / MongoDB backend (comment create + display, persisted).
- Contributed to the **friends** feature (search, add, and remove).
- Designed and built the **TP04 presentation deck** — structure, slides, diagrams,
  and speaker notes.
- Edited, integrated, and formatted the written reports (**TP01–TP03**) and
  finalized all **references in APA format**.
