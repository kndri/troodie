
  create policy "Authenticated users can upload board covers"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'board-covers'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Authenticated users can upload post photos"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'post-photos'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Authenticated users can upload restaurant photos"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'restaurant-photos'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Avatar images are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Board covers are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'board-covers'::text));



  create policy "Community admins can delete images"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'community-images'::text) AND (EXISTS ( SELECT 1
   FROM communities
  WHERE ((communities.admin_id = auth.uid()) AND ((communities.id)::text = (storage.foldername((communities.name)::text))[1]))))));



  create policy "Community admins can update images"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'community-images'::text) AND (EXISTS ( SELECT 1
   FROM communities
  WHERE ((communities.admin_id = auth.uid()) AND ((communities.id)::text = (storage.foldername((communities.name)::text))[1]))))));



  create policy "Community admins can upload images"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'community-images'::text) AND (EXISTS ( SELECT 1
   FROM communities
  WHERE ((communities.admin_id = auth.uid()) AND ((communities.id)::text = (storage.foldername((communities.name)::text))[1]))))));



  create policy "Community images are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'community-images'::text));



  create policy "Post photos are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'post-photos'::text));



  create policy "Public can view all post photos"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'post-photos'::text));



  create policy "Restaurant photos are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'restaurant-photos'::text));



  create policy "Users can delete their own avatar"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can delete their own board covers"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'board-covers'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can delete their own post photos"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'post-photos'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND ((storage.foldername(name))[2] = (auth.uid())::text)));



  create policy "Users can delete their own restaurant photos"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'restaurant-photos'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can update their own avatar"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can update their own board covers"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'board-covers'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can update their own post photos"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'post-photos'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND ((storage.foldername(name))[2] = (auth.uid())::text)));



  create policy "Users can update their own restaurant photos"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'restaurant-photos'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can upload their own avatar"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "Users can upload their own post photos"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'post-photos'::text) AND ((storage.foldername(name))[1] = 'posts'::text) AND ((storage.foldername(name))[2] = (auth.uid())::text)));
