"use server"

import db from "@/database/drizzle"
import { getCourseById, getUserProgress } from "@/database/queries"
import { userProgress } from "@/database/schema"
import { auth, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const upsertUserProgress = async (courseId: number) => {
    const {userId} = await auth()
    const user = await currentUser()

    if(!userId || !user) {
        throw new Error("Unathorized");
    }
    const course = await getCourseById(courseId)
    if (!course) {
        throw new Error("Course not found");
    }

    // if (!course.units.length ||!course.units[0].lessons.length) {
    //     throw new Error("Course is empty");
    // }

    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName ||"User",
            userImageSrc: user.imageUrl || "/maskot.svg"
        })
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/maskot.svg",
    });

    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}